(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.exportDatabase = factory());
})(this, (function () {
  function getSettingsExportDateString(date, dateSeparator, dateTimeSeparator, timeSeparator, resolution) {
    const values = [
      date.getUTCFullYear().toString(),
      dateSeparator,
      (date.getUTCMonth() + 1).toString().padStart(2, '0'),
      dateSeparator,
      date.getUTCDate().toString().padStart(2, '0'),
      dateTimeSeparator,
      date.getUTCHours().toString().padStart(2, '0'),
      timeSeparator,
      date.getUTCMinutes().toString().padStart(2, '0'),
      timeSeparator,
      date.getUTCSeconds().toString().padStart(2, '0')
    ];
    return values.slice(0, resolution * 2 - 1).join('');
  }

  function progressCallback ({totalRows, completedRows}) {
    console.log(`Progress: ${completedRows} of ${totalRows} rows completed`);
  }

  async function exportDatabase() {
    const db = await new Dexie('dict').open();
    blob = await db.export({progressCallback: progressCallback});
    download(blob, `yomichan-dictionaries-${getSettingsExportDateString(new Date(Date.now()), '-', '-', '-', 6)}.json`, 'application/json');
  }

  return exportDatabase;
}));
