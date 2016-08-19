#! /usr/bin/env python
import sys, csv, bz2#, os

def main(argv=None):
  # dir_path = os.path.dirname(os.getcwd())
  #print dir_path
  if argv is None:
    argv = sys.argv
    argv.pop(0)
  f = bz2.BZ2File(argv.pop(0), 'r')
  print "reading bz2 timing file"
  indb = csv.DictReader(f, dialect='excel-tab')
  ns = indb.fieldnames[-14:]
  idref = {}
  for x in indb:
    idref[x['NiteID']] = dict(zip(ns, [x[k] for k in ns]))
  f.close()
  print "reading databse" 
  f = open(argv.pop(0), 'rb')
  indb = csv.DictReader(f, dialect='excel-tab')
  col = argv.pop(0)
  print "target column: "+col
  ncols = [col + '_' + k for k in ns]
  fn = indb.fieldnames + ncols
  try:
    out = open(argv.pop(0),'w')
  except IndexError:
    out = sys.stdout
  outdb = csv.DictWriter(out, fieldnames=fn, dialect='excel-tab')
  outdb.writeheader()
  print "writing timing info to database"
  for x in indb:
    cdata = idref.get(x[col], {})
    x.update(zip(ncols, [cdata.get(k, '') for k in ns]))
    outdb.writerow(x)
  f.close()

if __name__ == '__main__':
  main()
