db.eventTypes.remove({});

db.eventTypes.insertMany([
  { name: 'scr', label: 'SCRs', order: 1 },
  { name: 'wo', label: 'WOs', order: 2 },
  { name: 'wr', label: 'WRs', order: 3 },
  { name: 'tcc', label: 'TCCs', order: 4 },
  { name: 'pmid', label: 'PMIDs', order: 5 },
  { name: 'toe_eval', label: 'TOE EVALs', order: 6 },
  { name: 'dcn', label: 'DCNs', order: 7 }
]);
