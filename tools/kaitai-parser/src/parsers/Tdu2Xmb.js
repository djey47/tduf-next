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
      this.magic = KaitaiStream.bytesToStr(this._io.readBytes(8), "ascii");
      this.descriptorTableAddr = this._io.readU4le();
      this.dataStartAddr = this._io.readU4le();
      this.dataRealAddr = this._io.readU4le();
      this.keyAddr = this._io.readU4le();
      this.dataStartRealAddr = this._io.readU4le();
      this.nodesSection = new NodeList(this._io, this, this._root);
      this.data = this._io.readBytes(905922);
      this.strings = new StringList(this._io, this, this._root);
      this.rest = this._io.readBytesFull();
    }
  
    var NodeList = Tdu2Xmb.NodeList = (function() {
      function NodeList(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      NodeList.prototype._read = function() {
        this.nodes = new Array(645);
        for (var i = 0; i < 645; i++) {
          this.nodes[i] = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ascii");
        }
        this.padding = this._io.readBytes(5);
      }
  
      return NodeList;
    })();
  
    var DataList = Tdu2Xmb.DataList = (function() {
      function DataList(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      DataList.prototype._read = function() {
        this.rawCount = this._io.readU4le();
        this.unk = this._io.readU4le();
        this.dataItems = new Array(this.dataCount);
        for (var i = 0; i < this.dataCount; i++) {
          this.dataItems[i] = new DataItem(this._io, this, this._root);
        }
      }
      Object.defineProperty(DataList.prototype, 'dataCount', {
        get: function() {
          if (this._m_dataCount !== undefined)
            return this._m_dataCount;
          this._m_dataCount = ((this.rawCount >>> 4) & 2047);
          return this._m_dataCount;
        }
      });
  
      return DataList;
    })();
  
    var StructureDef = Tdu2Xmb.StructureDef = (function() {
      function StructureDef(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      StructureDef.prototype._read = function() {
        this.unk1 = this._io.readBytes(8);
        this.structure = new Array(736);
        for (var i = 0; i < 736; i++) {
          this.structure[i] = new StructureEntry(this._io, this, this._root);
        }
        this.unk2 = this._io.readBytes(8);
      }
  
      return StructureDef;
    })();
  
    var StructureEntry = Tdu2Xmb.StructureEntry = (function() {
      function StructureEntry(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      StructureEntry.prototype._read = function() {
        this.v1 = this._io.readU4le();
        this.v2 = this._io.readU4le();
      }
  
      return StructureEntry;
    })();
  
    var DataItem = Tdu2Xmb.DataItem = (function() {
      function DataItem(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      DataItem.prototype._read = function() {
        this.relDataItemAddr = this._io.readU4le();
        this.unknown = this._io.readU4le();
      }
      Object.defineProperty(DataItem.prototype, 'absDataItemAddr', {
        get: function() {
          if (this._m_absDataItemAddr !== undefined)
            return this._m_absDataItemAddr;
          this._m_absDataItemAddr = (this.relDataItemAddr + this._root.descriptorTableAddr);
          return this._m_absDataItemAddr;
        }
      });
      Object.defineProperty(DataItem.prototype, 'name', {
        get: function() {
          if (this._m_name !== undefined)
            return this._m_name;
          var _pos = this._io.pos;
          this._io.seek(this.absDataItemAddr);
          this._m_name = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ascii");
          this._io.seek(_pos);
          return this._m_name;
        }
      });
  
      return DataItem;
    })();
  
    var StringList = Tdu2Xmb.StringList = (function() {
      function StringList(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      StringList.prototype._read = function() {
        this.name = [];
        var i = 0;
        while (!this._io.isEof()) {
          this.name.push(KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "UTF-8"));
          i++;
        }
      }
  
      return StringList;
    })();
    Object.defineProperty(Tdu2Xmb.prototype, 'nodeSection', {
      get: function() {
        if (this._m_nodeSection !== undefined)
          return this._m_nodeSection;
        var _pos = this._io.pos;
        this._io.seek(this.descriptorTableAddr);
        this._m_nodeSection = new NodeList(this._io, this, this._root);
        this._io.seek(_pos);
        return this._m_nodeSection;
      }
    });
    Object.defineProperty(Tdu2Xmb.prototype, 'dataSection', {
      get: function() {
        if (this._m_dataSection !== undefined)
          return this._m_dataSection;
        var _pos = this._io.pos;
        this._io.seek((this.dataStartAddr + (this.dataStartRealAddr * 4)));
        this._m_dataSection = new DataList(this._io, this, this._root);
        this._io.seek(_pos);
        return this._m_dataSection;
      }
    });
  
    return Tdu2Xmb;
  })();
  return Tdu2Xmb;
  }));
  