$('.draggable-elem').bind({
    'touchstart mousedown': function(event){
        event.preventDefault();

        let eventPos = {};
        if(event.type == 'touchstart'){
            eventPos = {
                x: event.originalEvent.changedTouches[0].pageX,
                y: event.originalEvent.changedTouches[0].pageY
            };
        }else{
            eventPos = {x: event.pageX, y:event.pageY};
        }

        this.initialTouchPos = eventPos;
        this.initialDocPos = $(this).position();
        this.touching = true;
    },
    'touchmove mousemove': function(event){
        if(!this.touching) return;
        event.preventDefault();

        let eventPos;
        if(event.type == 'touchmove'){
            eventPos = {
                x: event.originalEvent.changedTouches[0].pageX,
                y: event.originalEvent.changedTouches[0].pageY
            };
        }else{
            eventPos = {x: event.pageX,y: event.pageY};
        }

        let left = this.initialDocPos.left + (eventPos.x - this.initialTouchPos.x);
        let top = this.initialDocPos.top + (eventPos.y - this.initialTouchPos.y);

        $(this).css({left: left, top: top});
    },
    'touchend mouseup': function(event){
        if(!this.touching) return;
        this.touching = false;
        delete this.touching;
        delete this.initialTouchPos;
        delete this.initialDocPos;
    }
});