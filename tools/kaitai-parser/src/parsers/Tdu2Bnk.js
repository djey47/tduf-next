// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['kaitai-struct/KaitaiStream'], factory);
    } else if (typeof module === 'object' && module.exports) {
      module.exports = factory(require('kaitai-struct/KaitaiStream'));
    } else {
      root.Tdu2Bnk = factory(root.KaitaiStream);
    }
  }(this, function (KaitaiStream) {
  var Tdu2Bnk = (function() {
    Tdu2Bnk.FileType = Object.freeze({
      SCENE_3DD: 0,
      GEOMETRY_3DG: 1,
      MATERIALS_2DM: 2,
      TEXTURE_2DB: 3,
      PHY_DHK_XMB: 4,
      OTHER: 65535,
  
      0: "SCENE_3DD",
      1: "GEOMETRY_3DG",
      2: "MATERIALS_2DM",
      3: "TEXTURE_2DB",
      4: "PHY_DHK_XMB",
      65535: "OTHER",
    });
  
    Tdu2Bnk.FileSubtype = Object.freeze({
      CAR_MODEL: 9,
      BINARY_DATA_XMB: 11,
      COLORS: 21,
      OTHER: 65535,
  
      9: "CAR_MODEL",
      11: "BINARY_DATA_XMB",
      21: "COLORS",
      65535: "OTHER",
    });
  
    function Tdu2Bnk(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
  
      this._read();
    }
    Tdu2Bnk.prototype._read = function() {
      this.header = new HeaderSection(this._io, this, this._root);
    }
  
    var TreeData = Tdu2Bnk.TreeData = (function() {
      function TreeData(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      TreeData.prototype._read = function() {
        this.treeEntries = [];
        var i = 0;
        while (!this._io.isEof()) {
          this.treeEntries.push(new TreeEntry(this._io, this, this._root));
          i++;
        }
      }
  
      return TreeData;
    })();
  
    var CommonData = Tdu2Bnk.CommonData = (function() {
      function CommonData(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      CommonData.prototype._read = function() {
        this.length = this._io.readU4le();
        this.checksum = this._io.readU4le();
      }
  
      return CommonData;
    })();
  
    var MagicSection = Tdu2Bnk.MagicSection = (function() {
      function MagicSection(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      MagicSection.prototype._read = function() {
        this.common = new CommonData(this._io, this, this._root);
        this._raw_data = this._io.readBytes(this.common.length);
        var _io__raw_data = new KaitaiStream(this._raw_data);
        this.data = new MagicData(_io__raw_data, this, this._root);
      }
  
      return MagicSection;
    })();
  
    var TypeMappingEntry = Tdu2Bnk.TypeMappingEntry = (function() {
      function TypeMappingEntry(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      TypeMappingEntry.prototype._read = function() {
        this.type = this._io.readU2le();
        this.subtype = this._io.readU2le();
      }
  
      return TypeMappingEntry;
    })();
  
    var TreeSection = Tdu2Bnk.TreeSection = (function() {
      function TreeSection(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      TreeSection.prototype._read = function() {
        this.common = new CommonData(this._io, this, this._root);
        this._raw_data = this._io.readBytes(this.common.length);
        var _io__raw_data = new KaitaiStream(this._raw_data);
        this.data = new TreeData(_io__raw_data, this, this._root);
      }
  
      return TreeSection;
    })();
  
    var OrderEntry = Tdu2Bnk.OrderEntry = (function() {
      function OrderEntry(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      OrderEntry.prototype._read = function() {
        this.treeFileIndex = this._io.readU1();
      }
  
      return OrderEntry;
    })();
  
    var TypeMappingSection = Tdu2Bnk.TypeMappingSection = (function() {
      function TypeMappingSection(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      TypeMappingSection.prototype._read = function() {
        this.common = new CommonData(this._io, this, this._root);
        this._raw_data = this._io.readBytes(this.common.length);
        var _io__raw_data = new KaitaiStream(this._raw_data);
        this.data = new TypeMappingData(_io__raw_data, this, this._root);
      }
  
      return TypeMappingSection;
    })();
  
    var HeaderSection = Tdu2Bnk.HeaderSection = (function() {
      function HeaderSection(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      HeaderSection.prototype._read = function() {
        this.common = new CommonData(this._io, this, this._root);
        this._raw_data = this._io.readBytes(this.common.length);
        var _io__raw_data = new KaitaiStream(this._raw_data);
        this.data = new HeaderData(_io__raw_data, this, this._root);
      }
  
      return HeaderSection;
    })();
  
    var SizeData = Tdu2Bnk.SizeData = (function() {
      function SizeData(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      SizeData.prototype._read = function() {
        this.sizeEntries = new Array(this._root.header.data.packedCount);
        for (var i = 0; i < this._root.header.data.packedCount; i++) {
          this.sizeEntries[i] = new SizeEntry(this._io, this, this._root);
        }
      }
  
      return SizeData;
    })();
  
    var SizeSection = Tdu2Bnk.SizeSection = (function() {
      function SizeSection(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      SizeSection.prototype._read = function() {
        this.common = new CommonData(this._io, this, this._root);
        this._raw_data = this._io.readBytes(this.common.length);
        var _io__raw_data = new KaitaiStream(this._raw_data);
        this.data = new SizeData(_io__raw_data, this, this._root);
      }
  
      return SizeSection;
    })();
  
    var OrderData = Tdu2Bnk.OrderData = (function() {
      function OrderData(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      OrderData.prototype._read = function() {
        this.orderEntries = [];
        var i = 0;
        while (!this._io.isEof()) {
          this.orderEntries.push(new OrderEntry(this._io, this, this._root));
          i++;
        }
      }
  
      return OrderData;
    })();
  
    var PackedEntry = Tdu2Bnk.PackedEntry = (function() {
      function PackedEntry(_io, _parent, _root, fileIndex) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
        this.fileIndex = fileIndex;
  
        this._read();
      }
      PackedEntry.prototype._read = function() {
      }
      Object.defineProperty(PackedEntry.prototype, 'file', {
        get: function() {
          if (this._m_file !== undefined)
            return this._m_file;
          var _pos = this._io.pos;
          this._io.seek(this._root.sizeSectionInstance.data.sizeEntries[this.fileIndex].address);
          this._m_file = this._io.readBytes(this._root.sizeSectionInstance.data.sizeEntries[this.fileIndex].size);
          this._io.seek(_pos);
          return this._m_file;
        }
      });
  
      return PackedEntry;
    })();
  
    var OrderSection = Tdu2Bnk.OrderSection = (function() {
      function OrderSection(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      OrderSection.prototype._read = function() {
        this.common = new CommonData(this._io, this, this._root);
        this._raw_data = this._io.readBytes(this.common.length);
        var _io__raw_data = new KaitaiStream(this._raw_data);
        this.data = new OrderData(_io__raw_data, this, this._root);
      }
  
      return OrderSection;
    })();
  
    var PackedSection = Tdu2Bnk.PackedSection = (function() {
      function PackedSection(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      PackedSection.prototype._read = function() {
        this.packedEntries = new Array(this._root.header.data.packedCount);
        for (var i = 0; i < this._root.header.data.packedCount; i++) {
          this.packedEntries[i] = new PackedEntry(this._io, this, this._root, i);
        }
      }
  
      return PackedSection;
    })();
  
    var MagicData = Tdu2Bnk.MagicData = (function() {
      function MagicData(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      MagicData.prototype._read = function() {
        this.unk = this._io.readU4le();
      }
  
      return MagicData;
    })();
  
    var TypeMappingData = Tdu2Bnk.TypeMappingData = (function() {
      function TypeMappingData(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      TypeMappingData.prototype._read = function() {
        this.typeMappingEntries = new Array(this._root.header.data.packedCount);
        for (var i = 0; i < this._root.header.data.packedCount; i++) {
          this.typeMappingEntries[i] = new TypeMappingEntry(this._io, this, this._root);
        }
      }
  
      return TypeMappingData;
    })();
  
    var TreeEntry = Tdu2Bnk.TreeEntry = (function() {
      function TreeEntry(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      TreeEntry.prototype._read = function() {
        this.nameSize = this._io.readS1();
        if (this.nameSize < 0) {
          this.childrenCount = this._io.readU1();
        }
        if (this.nameSize < 0) {
          this.dirName = KaitaiStream.bytesToStr(this._io.readBytes((this.nameSize * -1)), "ascii");
        }
        if (this.nameSize >= 0) {
          this.fileName = KaitaiStream.bytesToStr(this._io.readBytes(this.nameSize), "ascii");
        }
      }
  
      return TreeEntry;
    })();
  
    var HeaderData = Tdu2Bnk.HeaderData = (function() {
      function HeaderData(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      HeaderData.prototype._read = function() {
        this.tag = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(12), 0, false), "ascii");
        this.flags = this._io.readBytes(4);
        this.fileSize = this._io.readU4le();
        this.packedSize = this._io.readU4le();
        this.blockSize = this._io.readU4le();
        this.sixteen = this._io.readU4le();
        this.packedCount = this._io.readU4le();
        this.year = this._io.readU4le();
        this.sizeSectionAddr = this._io.readU4le();
        this.typeMappingSectionAddr = this._io.readU4le();
        this.treeSectionAddr = this._io.readU4le();
        this.orderSectionAddr = this._io.readU4le();
        this.magicSectionAddr = this._io.readU4le();
        this.packedSectionAddr = this._io.readU4le();
      }
  
      return HeaderData;
    })();
  
    var SizeEntry = Tdu2Bnk.SizeEntry = (function() {
      function SizeEntry(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      SizeEntry.prototype._read = function() {
        this.address = this._io.readU4le();
        this.size = this._io.readU4le();
        this.unknown = this._io.readBytes(8);
        this.sixteen = this._io.readU4le();
      }
  
      return SizeEntry;
    })();
    Object.defineProperty(Tdu2Bnk.prototype, 'magicSectionInstance', {
      get: function() {
        if (this._m_magicSectionInstance !== undefined)
          return this._m_magicSectionInstance;
        if (this.header.data.magicSectionAddr > 0) {
          var _pos = this._io.pos;
          this._io.seek(this.header.data.magicSectionAddr);
          this._m_magicSectionInstance = new MagicSection(this._io, this, this._root);
          this._io.seek(_pos);
        }
        return this._m_magicSectionInstance;
      }
    });
    Object.defineProperty(Tdu2Bnk.prototype, 'packedSectionInstance', {
      get: function() {
        if (this._m_packedSectionInstance !== undefined)
          return this._m_packedSectionInstance;
        var _pos = this._io.pos;
        this._io.seek(this.header.data.packedSectionAddr);
        this._m_packedSectionInstance = new PackedSection(this._io, this, this._root);
        this._io.seek(_pos);
        return this._m_packedSectionInstance;
      }
    });
    Object.defineProperty(Tdu2Bnk.prototype, 'typeMappingSectionInstance', {
      get: function() {
        if (this._m_typeMappingSectionInstance !== undefined)
          return this._m_typeMappingSectionInstance;
        var _pos = this._io.pos;
        this._io.seek(this.header.data.typeMappingSectionAddr);
        this._m_typeMappingSectionInstance = new TypeMappingSection(this._io, this, this._root);
        this._io.seek(_pos);
        return this._m_typeMappingSectionInstance;
      }
    });
    Object.defineProperty(Tdu2Bnk.prototype, 'orderSectionInstance', {
      get: function() {
        if (this._m_orderSectionInstance !== undefined)
          return this._m_orderSectionInstance;
        var _pos = this._io.pos;
        this._io.seek(this.header.data.orderSectionAddr);
        this._m_orderSectionInstance = new OrderSection(this._io, this, this._root);
        this._io.seek(_pos);
        return this._m_orderSectionInstance;
      }
    });
    Object.defineProperty(Tdu2Bnk.prototype, 'treeSectionInstance', {
      get: function() {
        if (this._m_treeSectionInstance !== undefined)
          return this._m_treeSectionInstance;
        var _pos = this._io.pos;
        this._io.seek(this.header.data.treeSectionAddr);
        this._m_treeSectionInstance = new TreeSection(this._io, this, this._root);
        this._io.seek(_pos);
        return this._m_treeSectionInstance;
      }
    });
    Object.defineProperty(Tdu2Bnk.prototype, 'sizeSectionInstance', {
      get: function() {
        if (this._m_sizeSectionInstance !== undefined)
          return this._m_sizeSectionInstance;
        var _pos = this._io.pos;
        this._io.seek(this.header.data.sizeSectionAddr);
        this._m_sizeSectionInstance = new SizeSection(this._io, this, this._root);
        this._io.seek(_pos);
        return this._m_sizeSectionInstance;
      }
    });
  
    return Tdu2Bnk;
  })();
  return Tdu2Bnk;
  }));
  