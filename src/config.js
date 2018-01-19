'use strict';

export const isSupportHistoryApi = 'state' in history && 'replaceState' in history;
