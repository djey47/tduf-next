TDU1 DATABASE FORMAT SPECIFICATION
==================================

Database files are packed into *BNK* files.

Two kind of files :

- **DB.BNK** contains 18 .db files, which embed raw values for all database topics

- Each **DB_xx.BNK** (where xx is a language code) contain 18 .xx files, which embed resources (text linked to raw values above).

## Files

### .db
Each file is encrypted and can be read using TDUdec tool (originally written by Luigi Auriemma); it gives a csv file format eventually.

### .ch/.fr/.ge/.it/.ja/.ko/.sp/.us
Those are plain text files, containing mostly resource identifier (numeric value) and related text value.

## Topics
TDU1 database is spawn into 18 topics, which can be understood as a db table on a technical point of view.