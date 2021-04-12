2db format notes
================

TDU1/TDU2 share the same specifications.

- [TDUF structure def (alpha)](https://github.com/djey47/tduf/raw/master/lib-unlimited/src/main/resources/files/structures/2DB-map.json)
- [DDS structure def (alpha)](https://github.com/djey47/tduf/raw/master/lib-unlimited/src/main/resources/files/structures/DDS-map.json)
## Archive

Format 2DB :
144 -> A8R8G8B8



Problème potentiel : nom interne de la texture, basé sur le nom de fichier; si le fichier porte un nom différent.

Header :
* dw_type positionné à 29 (1D000000) sur la texture d'origine
valeurs : 29 (majoritairement des ts et ws) - 55 - 51


*dw_flags positionné à 8192 (00200000) sur la texture d'origine
valeurs : 8192 - 2048 - 1024 - 


dw_unk6 positionné à 972 (CC030000)
dw_unk7 positionné à 28392704 (003DB101)

---

Hello Jerome,
 
It looks like people get some problems related to .DDS to .2DB
conversion. I haven't paid much attention to .2DB files, but do you
think it could be possible to "create" .2DB files right from .DDS,
instead of "replacing" DirectDrawSurface data inside .2DB image?
 
Not sure if this could help, but here are some code that ZModeler
uses to convert .2DB to .DDS:
 
 
 
  struct tDDSHeader
  {
    DWORD     m_dwMagic;
    DWORD     m_dwSize;
    DWORD     m_dwFlags;
    DWORD     m_dwHeight;
    DWORD     m_dwWidth;
    DWORD     m_dwPitchOrLinearSize;
    DWORD     m_dwDepth;
    DWORD     m_dwMipMapCount;
    DWORD     m_dwReserved1[11];
    struct 
    {
      DWORD dwSize;
      DWORD dwFlags;
      DWORD dwFourCC;
      DWORD dwRGBBitCount;
      DWORD dwRBitMask;
      DWORD dwGBitMask;
      DWORD dwBBitMask;
      DWORD dwRGBAlphaBitMask;
    }m_PixelFormat;
    struct
    {
      DWORD   dwCaps1, dwCaps2, Reserved[2];
    }m_ddsCaps;
    DWORD     m_dwReserved2;
 
    //initialization method:
    ZRESULT initFrom2DB(core::io::IStream* p2DBStream);
    tDDSHeader() {memset(this,0, sizeof(*this));}
  };
 
  struct t2DBHeader
  {
    DWORD     m_dw1;          //2
    DWORD     m_dwZero1;      //0
    DWORD     m_dwSize1;
    DWORD     m_dwID1;        //".2DB"
    DWORD     m_dwID2;        //"BMAP"
    DWORD     m_dwZero2;      //0
    DWORD     m_dwSize2;
    DWORD     m_dwSize3;
    core::io::tString8  m_strName;
    short     m_width;
    short     m_height;
    short     m_unk1;         //1
    BYTE      m_nBytes[2];    //?
    DWORD     m_dwUnk2;       //? some sort of flags in first byte;?
    DWORD     m_dwZeros[2];   //0,0,
    DWORD     m_type;         //"3", "7"... 0x1D for "RAW/BMP";
    DWORD     m_dwFlags;      //0x2000, 0x800 or 0x400... looks like pitch/linear size
    DWORD     m_dwUnk3;       //?
    DWORD     m_dwUnk4;       //0x0001xxxxx;
    DWORD     m_dwZero4;      //0
  };
 
 
 
//-------------------------------------------------------
// @name : tDDSHeader::initFrom2DB
// initialization method:
// @param tTextureInfo& info             : 
//
// @return void : 
//-------------------------------------------------------
ZRESULT tDDSHeader::initFrom2DB(core::io::IStream* pStream)
{
  if (NULL == pStream)
    return ZRESULT_INVALID_ARG;
  t2DBHeader hdr;
  pStream->read(&hdr, sizeof(t2DBHeader));
  if (hdr.m_dwID1 != 0x4244322E //".2DB"
    ||hdr.m_dwID2 != 0x50414D42)//"BMAP"
    return ZRESULT_FALSE;
 
  m_dwMagic   = 0x20534444; //"DDS "
  m_dwSize    = 0x7C;
  m_dwFlags   = 0x81007;//DDSD_CAPS | DDSD_PIXELFORMAT | DDSD_WIDTH | DDSD_HEIGHT | DDSD_LINEARSIZE;
  m_dwHeight  = hdr.m_height;
  m_dwWidth   = hdr.m_width;
  m_dwPitchOrLinearSize = hdr.m_dwFlags;
  //pixel format:
  m_PixelFormat.dwSize  = 0x20;
  //set flags: DDPF_RGB with DDPF_ALPHAPIXELS : DDPF_FOURCC;
  if (4 == (m_PixelFormat.dwFlags = (hdr.m_type == 0x1D) ? 0x41 : 4))
  {
    //assign proper FourCC
    m_PixelFormat.dwFourCC = 
      (hdr.m_type == 0x33) ? DDSTEXTURE_DXT1 : 
      ((hdr.m_type == 0x37) ? DDSTEXTURE_DXT5 : DDSTEXTURE_DXT3);
  }
  else//bmp: set up bitmask;
  {
    m_dwPitchOrLinearSize = hdr.m_width*hdr.m_height*4;
    m_PixelFormat.dwRGBBitCount = 32;
    //set for D3DFMT_A8R8G8B8:
    m_PixelFormat.dwRBitMask = 0x00FF0000;
    m_PixelFormat.dwGBitMask = 0x0000FF00;
    m_PixelFormat.dwBBitMask = 0x000000FF;
    m_PixelFormat.dwRGBAlphaBitMask = 0xFF000000;
  }
  //caps:
  m_ddsCaps.dwCaps1 = 0x1000;//DDSCAPS_TEXTURE;
  return ZRESULT_OK;
}
 
//-----------------------------
Yes, there are several unknown entries in .2DB header, but if we
could clear these things out, users will be able to create valid .2DB
textures quite simply. There are several issues currently (when .DDS
uses certian DXT-compression method and .2DB refers to another; when
.DDS has mip-maps and .2DB does not and like this. Result .2DB
textures are invalid.
 
Also, have you heard any news from Jeff?
 
----------------------
Regards, Oleg
----------------------
  www.zmodeler2.com
  
  
  
================== UPDATE 02-28-2009 DJEY =======================

  struct t2DBHeader
  {
    DWORD     m_dw1;          //2
    DWORD     m_dwZero1;      //0
    DWORD     m_dwSize1;					// Full file size (bytes)
    DWORD     m_dwID1;        //".2DB"
    DWORD     m_dwID2;        //"BMAP"
    DWORD     m_dwZero2;      //0
    DWORD     m_dwSize2;					// File size - 32 (bytes)					
    DWORD     m_dwSize3;					// File size - 32 (bytes)
    core::io::tString8  m_strName;
    short     m_width;
    short     m_height;
    short     m_unk1;         //1
    BYTE      m_bMipmapCount1				// Yes!
    BYTE      m_bMipmapCount2				// Same as m_bMipmapCount1
    BYTE      m_bFormat						// Texture compression: 0x88(=DXT5) 0x84(=DXT1) 0xc4(=DXT1') 0x90(=ARGB8)
    BYTE	  m_bUnk1bis
    short     m_dwUnk2;       //? some sort of flags in first byte;?
    DWORD     m_dwZeros[2];   //0,0,
    DWORD     m_type;         //"3", "7"... 0x1D for "RAW/BMP";
    DWORD     m_dwFlags;      //0x2000, 0x800 or 0x400... looks like pitch/linear size
    DWORD     m_dwUnk3;       //?
    DWORD     m_dwUnk4;						//0x0001xxxxx; Checksum ???
    DWORD     m_dwZero4;      //0
  };
