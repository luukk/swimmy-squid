function Vector(dx,dy){
    var _dx = dx;
    var _dy = dy;
    var _r = Math.sqrt(_dx*_dx + _dy*_dy);
    var _hoek = Math.atan2(_dy,_dx);   

   this.__defineGetter__('dx',function(){
        return _dx;
    });

    this.__defineGetter__('dy',function(){
        return _dy;
    });

    this.__defineGetter__('r',function(){
        return _r;
    });

    this.__defineGetter__('hoek',function(){
        return _hoek;
    });

    this.__defineSetter__('dx',function(dx){
        _dx = dx;
        _r = Math.sqrt(_dx*_dx + _dy * _dy);
        _hoek = Math.atan2(_dy,_dx);
    });

    this.__defineSetter__('dy',function(dy){
        _dy = dy;
        _r = Math.sqrt(_dx*_dx + _dy * _dy);
        _hoek = Math.atan2(_dy,_dx);
    });

    this.__defineSetter__('r',function(r){
        _r = r;
        _dx = _r * Math.cos(_hoek);
        _dy = _r * Math.sin(_hoek);
    });

    this.__defineSetter__('hoek',function(hoek){
        _hoek = hoek;
        _dx = _r * Math.cos(_hoek);
        _dy = _r * Math.sin(_hoek);
    });



};
