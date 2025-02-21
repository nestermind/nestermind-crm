import { Logger } from '@nestjs/common';

import { Command, CommandRunner } from 'nest-commander';

import { CleanSuspendedWorkspacesCronCommand } from 'src/engine/workspace-manager/workspace-cleaner/commands/clean-suspended-workspaces.cron.command';
import { CalendarEventListFetchCronCommand } from 'src/modules/calendar/calendar-event-import-manager/crons/commands/calendar-event-list-fetch.cron.command';
import { CalendarEventsImportCronCommand } from 'src/modules/calendar/calendar-event-import-manager/crons/commands/calendar-import.cron.command';
import { CalendarOngoingStaleCronCommand } from 'src/modules/calendar/calendar-event-import-manager/crons/commands/calendar-ongoing-stale.cron.command';
import { MessagingMessageListFetchCronCommand } from 'src/modules/messaging/message-import-manager/crons/commands/messaging-message-list-fetch.cron.command';
import { MessagingMessagesImportCronCommand } from 'src/modules/messaging/message-import-manager/crons/commands/messaging-messages-import.cron.command';
import { MessagingOngoingStaleCronCommand } from 'src/modules/messaging/message-import-manager/crons/commands/messaging-ongoing-stale.cron.command';
import { MessagingMessageChannelSyncStatusMonitoringCronCommand } from 'src/modules/messaging/monitoring/crons/commands/messaging-message-channel-sync-status-monitoring.cron.command';

@Command({
  name: 'crons:start',
  description: 'Run specified cron jobs sequentially',
})
export class StartCronsCommand extends CommandRunner {
  private readonly logger = new Logger(StartCronsCommand.name);

  private readonly commandMap: Record<
    string,
    | MessagingMessageListFetchCronCommand
    | MessagingMessagesImportCronCommand
    | CalendarEventListFetchCronCommand
    | CalendarEventsImportCronCommand
    | MessagingOngoingStaleCronCommand
    | CalendarOngoingStaleCronCommand
    | MessagingMessageChannelSyncStatusMonitoringCronCommand
    | CleanSuspendedWorkspacesCronCommand
  > = {};

  constructor(
    private readonly messagingMessageListFetch: MessagingMessageListFetchCronCommand,
    private readonly messagingMessagesImport: MessagingMessagesImportCronCommand,
    private readonly calendarEventListFetch: CalendarEventListFetchCronCommand,
    private readonly calendarEventsImport: CalendarEventsImportCronCommand,
    private readonly messagingOngoingStale: MessagingOngoingStaleCronCommand,
    private readonly calendarOngoingStale: CalendarOngoingStaleCronCommand,
    private readonly messagingMessageChannelSyncStatusMonitoring: MessagingMessageChannelSyncStatusMonitoringCronCommand,
    private readonly cleanSuspendedWorkspaces: CleanSuspendedWorkspacesCronCommand,
  ) {
    super();
    this.initializeCommandMap();
  }

  private initializeCommandMap(): void {
    this.commandMap['cron:messaging:messages-import'] =
      this.messagingMessagesImport;
    this.commandMap['cron:messaging:message-list-fetch'] =
      this.messagingMessageListFetch;
    this.commandMap['cron:calendar:calendar-event-list-fetch'] =
      this.calendarEventListFetch;
    this.commandMap['cron:calendar:calendar-events-import'] =
      this.calendarEventsImport;
    this.commandMap['cron:messaging:ongoing-stale'] =
      this.messagingOngoingStale;
    this.commandMap['cron:calendar:ongoing-stale'] = this.calendarOngoingStale;

    this.commandMap['cron:messaging:monitoring:message-channel-sync-status'] =
      this.messagingMessageChannelSyncStatusMonitoring;
    this.commandMap['cron:clean-suspended-workspaces'] =
      this.cleanSuspendedWorkspaces;
  }

  async run(passedParams: string[]): Promise<void> {
    let params = passedParams;

    if (!params.length) {
      this.logger.log(
        'No commands specified, running all cron jobs sequentially',
      );

      params = Object.keys(this.commandMap);
    }

    for (const commandName of params) {
      await this.runCommand(commandName);
    }
  }

  private async runCommand(commandName: string): Promise<void> {
    const command = this.commandMap[commandName];

    if (!command) {
      this.logger.error(`Unknown command: ${commandName}`);
      this.logger.error('Available commands:');
      Object.keys(this.commandMap).forEach((name) => {
        this.logger.error(`  ${name}`);
      });

      return;
    }

    try {
      this.logger.log(`Running command: ${commandName}`);
      await command.run();
      this.logger.log(`Finished command: ${commandName}`);
    } catch (error) {
      this.logger.error(
        `Error running command ${commandName}:`,
        error instanceof Error ? error.stack : error,
      );
    }
  }
}
