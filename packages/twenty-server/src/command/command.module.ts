import { Module } from '@nestjs/common';

import { AppModule } from 'src/app.module';
import { DatabaseCommandModule } from 'src/database/commands/database-command.module';
import { FieldMetadataModule } from 'src/engine/metadata-modules/field-metadata/field-metadata.module';
import { ObjectMetadataModule } from 'src/engine/metadata-modules/object-metadata/object-metadata.module';
import { CleanSuspendedWorkspacesCronCommand } from 'src/engine/workspace-manager/workspace-cleaner/commands/clean-suspended-workspaces.cron.command';
import { WorkspaceCleanerModule } from 'src/engine/workspace-manager/workspace-cleaner/workspace-cleaner.module';
import { WorkspaceHealthCommandModule } from 'src/engine/workspace-manager/workspace-health/commands/workspace-health-command.module';
import { WorkspaceMigrationRunnerCommandsModule } from 'src/engine/workspace-manager/workspace-migration-runner/commands/workspace-migration-runner-commands.module';
import { WorkspaceSyncMetadataCommandsModule } from 'src/engine/workspace-manager/workspace-sync-metadata/commands/workspace-sync-metadata-commands.module';
import { CalendarEventListFetchCronCommand } from 'src/modules/calendar/calendar-event-import-manager/crons/commands/calendar-event-list-fetch.cron.command';
import { CalendarEventsImportCronCommand } from 'src/modules/calendar/calendar-event-import-manager/crons/commands/calendar-import.cron.command';
import { CalendarOngoingStaleCronCommand } from 'src/modules/calendar/calendar-event-import-manager/crons/commands/calendar-ongoing-stale.cron.command';
import { MessagingMessageListFetchCronCommand } from 'src/modules/messaging/message-import-manager/crons/commands/messaging-message-list-fetch.cron.command';
import { MessagingMessagesImportCronCommand } from 'src/modules/messaging/message-import-manager/crons/commands/messaging-messages-import.cron.command';
import { MessagingOngoingStaleCronCommand } from 'src/modules/messaging/message-import-manager/crons/commands/messaging-ongoing-stale.cron.command';
import { MessagingMessageChannelSyncStatusMonitoringCronCommand } from 'src/modules/messaging/monitoring/crons/commands/messaging-message-channel-sync-status-monitoring.cron.command';

import { StartCronsCommand } from './commands/start-crons.command';

@Module({
  imports: [
    AppModule,
    WorkspaceSyncMetadataCommandsModule,
    DatabaseCommandModule,
    WorkspaceCleanerModule,
    WorkspaceHealthCommandModule,
    WorkspaceMigrationRunnerCommandsModule,
    ObjectMetadataModule,
    FieldMetadataModule,
  ],
  providers: [
    StartCronsCommand,
    MessagingMessageListFetchCronCommand,
    MessagingMessagesImportCronCommand,
    MessagingOngoingStaleCronCommand,
    CalendarEventListFetchCronCommand,
    CalendarEventsImportCronCommand,
    CalendarOngoingStaleCronCommand,
    MessagingMessageChannelSyncStatusMonitoringCronCommand,
    CleanSuspendedWorkspacesCronCommand,
  ],
})
export class CommandModule {}
