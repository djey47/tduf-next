// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['kaitai-struct/KaitaiStream'], factory);
    } else if (typeof module === 'object' && module.exports) {
      module.exports = factory(require('kaitai-struct/KaitaiStream'));
    } else {
      root.Tdu1Pmi = factory(root.KaitaiStream);
    }
  }(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
  var Tdu1Pmi = (function() {
    function Tdu1Pmi(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
  
      this._read();
    }
    Tdu1Pmi.prototype._read = function() {
      this.unk0 = this._io.readBytes(8);
      this.sizeFile = this._io.readU4le();
      this.magic = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(4), 0, false), "ascii");
      this.mobaTag = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(4), 0, false), "ascii");
      this.unk1 = this._io.readBytes(4);
      if (!((KaitaiStream.byteArrayCompare(this.unk1, [0, 0, 3, 0]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([0, 0, 3, 0], this.unk1, this._io, "/seq/4");
      }
      this.sizeWithoutHeader = this._io.readU4le();
      this.sizeMoba = this._io.readU4le();
      this.assetCount = this._io.readU4le();
      this.heightMaybe = this._io.readF4le();
      this.height2Maybe = this._io.readF4le();
      this.gap1 = this._io.readBytes(4);
      if (!((KaitaiStream.byteArrayCompare(this.gap1, [205, 205, 205, 205]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([205, 205, 205, 205], this.gap1, this._io, "/seq/10");
      }
      this.unk2 = this._io.readBytes((this.sizeMoba - 36));
      this.gap2 = this._io.readBytes(4);
      if (!((KaitaiStream.byteArrayCompare(this.gap2, [205, 205, 205, 205]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([205, 205, 205, 205], this.gap2, this._io, "/seq/12");
      }
      this.assets = new AssetList(this._io, this, this._root);
    }
  
    var AssetList = Tdu1Pmi.AssetList = (function() {
      function AssetList(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      AssetList.prototype._read = function() {
        this.asset = [];
        for (var i = 0; i < this._parent.assetCount; i++) {
          this.asset.push(new Asset(this._io, this, this._root));
        }
      }
  
      return AssetList;
    })();
  
    var Entity = Tdu1Pmi.Entity = (function() {
      function Entity(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      Entity.prototype._read = function() {
        this.posX = this._io.readBytes(2);
        this.posY = this._io.readBytes(2);
        this.posZ = this._io.readBytes(2);
        this.scaleX = this._io.readBytes(2);
        this.scaleY = this._io.readBytes(2);
        this.scaleZ = this._io.readBytes(2);
        this.rotX = this._io.readBytes(2);
        this.rotY = this._io.readBytes(2);
        this.rotZ = this._io.readBytes(2);
        this.unkX = this._io.readBytes(2);
        this.unkY = this._io.readBytes(2);
        this.unkZ = this._io.readBytes(2);
        this.displayGroup = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(4), 0, false), "ascii");
        this.zeroes = this._io.readBytes(4);
        if (!((KaitaiStream.byteArrayCompare(this.zeroes, [0, 0, 0, 0]) == 0))) {
          throw new KaitaiStream.ValidationNotEqualError([0, 0, 0, 0], this.zeroes, this._io, "/types/entity/seq/13");
        }
      }
  
      return Entity;
    })();
  
    var EntityList = Tdu1Pmi.EntityList = (function() {
      function EntityList(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      EntityList.prototype._read = function() {
        this.entityList = [];
        for (var i = 0; i < this._parent.entityCount; i++) {
          switch (this._parent.entityType) {
          case 0:
            this.entityList.push(new Entity(this._io, this, this._root));
            break;
          case 85:
            this.entityList.push(new EntityAlt(this._io, this, this._root));
            break;
          }
        }
      }
  
      return EntityList;
    })();
  
    var EntityAlt = Tdu1Pmi.EntityAlt = (function() {
      function EntityAlt(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      EntityAlt.prototype._read = function() {
        this.unk = this._io.readBytes(128);
      }
  
      return EntityAlt;
    })();
  
    var Asset = Tdu1Pmi.Asset = (function() {
      function Asset(_io, _parent, _root) {
        this._io = _io;
        this._parent = _parent;
        this._root = _root || this;
  
        this._read();
      }
      Asset.prototype._read = function() {
        this.magicMob = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(8), 0, false), "ascii");
        this.size1Bytes = this._io.readU4le();
        this.size2Bytes = this._io.readU4le();
        this.entityName = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(8), 0, false), "ascii");
        this.entityCount = this._io.readU2le();
        this.entityType = this._io.readU2le();
        this.unk6 = this._io.readBytes(4);
        this.entities = new EntityList(this._io, this, this._root);
      }
  
      return Asset;
    })();
  
    return Tdu1Pmi;
  })();
  return Tdu1Pmi;
  }));
  