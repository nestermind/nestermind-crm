yarn command:prod cron:messaging:messages-import && \
yarn command:prod cron:messaging:message-list-fetch && \
yarn command:prod cron:calendar:calendar-event-list-fetch && \
yarn command:prod cron:calendar:calendar-events-import && \
yarn command:prod cron:messaging:ongoing-stale && \
yarn command:prod cron:calendar:ongoing-stale

yarn command:prod crons:start