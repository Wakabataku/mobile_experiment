//移動対象の初期位置,タッチ位置
let initialDocPos, initialTouchPos;

function touchStartEvent(event){
    //タッチによる画面スクロールを止める
    event.preventDefault();

    let eventPos = {
        x: event.changedTouches[0].pageX,
        y: event.changedTouches[0].pageY
    };

//タッチした初期情報の取得
initialTouchPos = eventPos;
initialDocPos = $(this).position();
}

function touchMoveEvent(event){
    event.preventDefault();

    //ドラッグ中のアイテムをカーソルの位置に追従
    let draggedElem = event.target;
    let touch = event.changedTouches[0];
    event.target.style.position = "fixed";
    event.target.style.top = (touch.pageY - window.pageYOffset - draggedElem.offsetHeight/2) + "px";
    event.target.style.left = (touch.pageX - window.pageXOffset - draggedElem.offsetWidth/2) + "px";

    //対象移動中にクローンの生成
    event.target.clone().insertAfter(this).addClass('cloned');

}

function touchEndEvent(event){
    event.preventDefault();

    event.target.style.position = "";
    event.target.style.top = eventPos.y;
    event.target.style.left = eventPos.x;

    //クローンの削除
    $('.cloned').removed();
}



//ドラッグ可能なアイテムへのタッチイベントの設定
let draggableItems = $(".draggable-elem");
for(let i=0;i<draggableItems.length;++i){
    let item = draggableItems[i];
    item.addEventListener('touchstart', touchStartEvent, false);
    item.addEventListener('touchmove', touchMoveEvent, false);
    item.addEventListener('touchend', touchEndEvent, false);
}