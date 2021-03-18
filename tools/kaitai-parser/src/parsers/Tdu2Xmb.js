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
    this.numberOfTypes = this._io.readU4le();
    this.rest = this._io.readBytesFull();
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

  var KeyDefs = Tdu2Xmb.KeyDefs = (function() {
    function KeyDefs(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    KeyDefs.prototype._read = function() {
      this.header = new KeyDefHeader(this._io, this, this._root);
      this.keys = new Array(this.header.numberOfKeys);
      for (var i = 0; i < this.header.numberOfKeys; i++) {
        this.keys[i] = new KeyDef(this._io, this, this._root);
      }
    }

    return KeyDefs;
  })();

  var TypeDef = Tdu2Xmb.TypeDef = (function() {
    function TypeDef(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TypeDef.prototype._read = function() {
      this.typeId = this._io.readU1();
      this.typeSize = this._io.readU2le();
      this.padding = this._io.readU1();
      this.rest = this._io.readBytes(4);
    }

    return TypeDef;
  })();

  var KeyDefHeader = Tdu2Xmb.KeyDefHeader = (function() {
    function KeyDefHeader(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    KeyDefHeader.prototype._read = function() {
      this.rawKeyInfo = this._io.readU4le();
      this.unknown = this._io.readU4le();
    }
    Object.defineProperty(KeyDefHeader.prototype, 'numberOfKeys', {
      get: function() {
        if (this._m_numberOfKeys !== undefined)
          return this._m_numberOfKeys;
        this._m_numberOfKeys = ((this.rawKeyInfo >>> 4) & 2047);
        return this._m_numberOfKeys;
      }
    });

    return KeyDefHeader;
  })();

  var Metadata = Tdu2Xmb.Metadata = (function() {
    function Metadata(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Metadata.prototype._read = function() {
      this.zero = this._io.readU4le();
      this.typeDefs = new Array(this._parent.numberOfTypes);
      for (var i = 0; i < this._parent.numberOfTypes; i++) {
        this.typeDefs[i] = new TypeDef(this._io, this, this._root);
      }
    }
    Object.defineProperty(Metadata.prototype, 'keyDefs', {
      get: function() {
        if (this._m_keyDefs !== undefined)
          return this._m_keyDefs;
        var _pos = this._io.pos;
        this._io.seek((this._parent.numberOfTypes * 4));
        this._m_keyDefs = new KeyDefs(this._io, this, this._root);
        this._io.seek(_pos);
        return this._m_keyDefs;
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
        var _ = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ascii");
        this.names.push(_);
        i++;
      } while (!(_ == "AA"));
    }

    return NameList;
  })();
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
