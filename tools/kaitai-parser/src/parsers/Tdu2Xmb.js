// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.Tdu2Xmb = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var Tdu2Xmb = (function() {
  Tdu2Xmb.DataType = Object.freeze({
    OBJECT: 0,
    BOOL: 1,
    S_INT_8: 2,
    S_INT_16: 3,
    S_INT_32: 4,
    S_INT_64: 5,
    U_INT_8: 6,
    U_INT_16: 7,
    U_INT_32: 8,
    U_INT_64: 9,
    FLOAT: 10,
    DOUBLE: 11,
    STRING: 12,
    ARRAY: 13,

    0: "OBJECT",
    1: "BOOL",
    2: "S_INT_8",
    3: "S_INT_16",
    4: "S_INT_32",
    5: "S_INT_64",
    6: "U_INT_8",
    7: "U_INT_16",
    8: "U_INT_32",
    9: "U_INT_64",
    10: "FLOAT",
    11: "DOUBLE",
    12: "STRING",
    13: "ARRAY",
  });

  function Tdu2Xmb(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Tdu2Xmb.prototype._read = function() {
    this.tag = KaitaiStream.bytesToStr(this._io.readBytes(4), "ascii");
    this.version = this._io.readU4le();
    this.descriptorTableAddr = this._io.readU4le();
    this.metadataAddr = this._io.readU4le();
    this.subobjectTableAddr = this._io.readU4le();
    this.keyOffset = this._io.readU4le();
    this.numberOfTypesRaw = this._io.readU4le();
  }

  var KeyDef = Tdu2Xmb.KeyDef = (function() {
    function KeyDef(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    KeyDef.prototype._read = function() {
      this.nameStringOffset = this._io.readU4le();
      this.typeOffset = this._io.readU1();
      this.padding = this._io.readU2le();
      this.arrayMarker = this._io.readU1();
    }
    Object.defineProperty(KeyDef.prototype, 'keyNameAbsAddr', {
      get: function() {
        if (this._m_keyNameAbsAddr !== undefined)
          return this._m_keyNameAbsAddr;
        this._m_keyNameAbsAddr = (this._root.descriptorTableAddr + this.nameStringOffset);
        return this._m_keyNameAbsAddr;
      }
    });

    return KeyDef;
  })();

  var ObjectDefHeader = Tdu2Xmb.ObjectDefHeader = (function() {
    function ObjectDefHeader(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ObjectDefHeader.prototype._read = function() {
      this.rawKeyInfo = this._io.readU4le();
      this.unknown = this._io.readU4le();
    }
    Object.defineProperty(ObjectDefHeader.prototype, 'numberOfKeys', {
      get: function() {
        if (this._m_numberOfKeys !== undefined)
          return this._m_numberOfKeys;
        this._m_numberOfKeys = ((this.rawKeyInfo >>> 4) & 2047);
        return this._m_numberOfKeys;
      }
    });

    return ObjectDefHeader;
  })();

  var ObjectDef = Tdu2Xmb.ObjectDef = (function() {
    function ObjectDef(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ObjectDef.prototype._read = function() {
      this.header = new ObjectDefHeader(this._io, this, this._root);
      this.keys = new Array(this.header.numberOfKeys);
      for (var i = 0; i < this.header.numberOfKeys; i++) {
        this.keys[i] = new KeyDef(this._io, this, this._root);
      }
    }

    return ObjectDef;
  })();

  var TypeDef = Tdu2Xmb.TypeDef = (function() {
    function TypeDef(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TypeDef.prototype._read = function() {
      this.packedTypeIdLen = this._io.readU4le();
      this.nameStringOffset = this._io.readU4le();
    }
    Object.defineProperty(TypeDef.prototype, 'typeId', {
      get: function() {
        if (this._m_typeId !== undefined)
          return this._m_typeId;
        this._m_typeId = (this.packedTypeIdLen & 255);
        return this._m_typeId;
      }
    });
    Object.defineProperty(TypeDef.prototype, 'privateLen', {
      get: function() {
        if (this._m_privateLen !== undefined)
          return this._m_privateLen;
        this._m_privateLen = (this.packedTypeIdLen >>> 16);
        return this._m_privateLen;
      }
    });

    return TypeDef;
  })();

  var ObjectDefs = Tdu2Xmb.ObjectDefs = (function() {
    function ObjectDefs(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ObjectDefs.prototype._read = function() {
      this.def = [];
      var i = 0;
      while (!this._io.isEof()) {
        this.def.push(new ObjectDef(this._io, this, this._root));
        i++;
      }
    }

    return ObjectDefs;
  })();

  var Metadata = Tdu2Xmb.Metadata = (function() {
    function Metadata(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Metadata.prototype._read = function() {
      this.typeDefs = new Array(this._parent.numberOfTypes);
      for (var i = 0; i < this._parent.numberOfTypes; i++) {
        this.typeDefs[i] = new TypeDef(this._io, this, this._root);
      }
    }
    Object.defineProperty(Metadata.prototype, 'objectDefs', {
      get: function() {
        if (this._m_objectDefs !== undefined)
          return this._m_objectDefs;
        var _pos = this._io.pos;
        this._io.seek((this._parent.numberOfTypesRaw * 4));
        this._raw__m_objectDefs = this._io.readBytes(((this._parent.subobjectTableAddr - this._parent.metadataAddr) - (this._parent.numberOfTypesRaw * 4)));
        var _io__raw__m_objectDefs = new KaitaiStream(this._raw__m_objectDefs);
        this._m_objectDefs = new ObjectDefs(_io__raw__m_objectDefs, this, this._root);
        this._io.seek(_pos);
        return this._m_objectDefs;
      }
    });

    return Metadata;
  })();

  var NameList = Tdu2Xmb.NameList = (function() {
    function NameList(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    NameList.prototype._read = function() {
      this.names = []
      var i = 0;
      do {
        var _ = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ASCII");
        this.names.push(_);
        i++;
      } while (!(_ == ""));
    }

    return NameList;
  })();
  Object.defineProperty(Tdu2Xmb.prototype, 'numberOfTypes', {
    get: function() {
      if (this._m_numberOfTypes !== undefined)
        return this._m_numberOfTypes;
      this._m_numberOfTypes = Math.floor(this.numberOfTypesRaw / 2);
      return this._m_numberOfTypes;
    }
  });
  Object.defineProperty(Tdu2Xmb.prototype, 'descriptorTableSection', {
    get: function() {
      if (this._m_descriptorTableSection !== undefined)
        return this._m_descriptorTableSection;
      var _pos = this._io.pos;
      this._io.seek(this.descriptorTableAddr);
      this._m_descriptorTableSection = new NameList(this._io, this, this._root);
      this._io.seek(_pos);
      return this._m_descriptorTableSection;
    }
  });
  Object.defineProperty(Tdu2Xmb.prototype, 'metadataSection', {
    get: function() {
      if (this._m_metadataSection !== undefined)
        return this._m_metadataSection;
      var _pos = this._io.pos;
      this._io.seek(this.metadataAddr);
      this._raw__m_metadataSection = this._io.readBytesFull();
      var _io__raw__m_metadataSection = new KaitaiStream(this._raw__m_metadataSection);
      this._m_metadataSection = new Metadata(_io__raw__m_metadataSection, this, this._root);
      this._io.seek(_pos);
      return this._m_metadataSection;
    }
  });
  Object.defineProperty(Tdu2Xmb.prototype, 'dataSection', {
    get: function() {
      if (this._m_dataSection !== undefined)
        return this._m_dataSection;
      var _pos = this._io.pos;
      this._io.seek(this.subobjectTableAddr);
      this._m_dataSection = this._io.readBytesFull();
      this._io.seek(_pos);
      return this._m_dataSection;
    }
  });

  return Tdu2Xmb;
})();
return Tdu2Xmb;
}));
