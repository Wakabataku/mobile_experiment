function touchStartEvent(event){
    //タッチによる画面スクロールを止める
    event.preventDefault();
}


function touchMoveEvent(event){
    event.preventDefault();

    //ドラッグ中のアイテムをカーソルの位置に追従
    let draggedElem = event.target;
    let touch = event.changedTouches[0];
    event.target.style.position = "fixed";
    event.target.style.top = (touch.pageY - window.pageYOffset - draggedElem.offsetHeight/2) + "px";
    event.target.style.left = (touch.pageX - window.pageXOffset - draggedElem.offsetWidth/2) + "px";
}

function touchEndEvent(event){
    event.preventDefault();

    //ドラッグ中の操作のために変更していたスタイルをもとに戻す
    let droppedElem = event.target;
    droppedElem.style.position = "";
    event.target.style.top = "";
    event.target.style.left = "";

    //ドロップした位置にあるドロップ可能なエレメントに親子付けする
    let touch = event.changedTouches[0];
    //スクロール分を加味した座標に存在するエレメントを新しい親とする
    let newParentElem = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset);
    if(newParentElem.className = "droppable-elem"){
        newParentElem.appendChild(droppedElem);
    }
}
{
    let draggableItems = $(".draggable-elem");
    // let draggable = document.getElementsByClassName("draggable-elem");
    for(let i=0; i<draggableItems.length; ++i){
        let item = draggableItems[i];
        item.addEventListener('touchstart', touchStartEvent, false);
        item.addEventListener('touchmove', touchMoveEvent, false);
        item.addEventListener('touched', touchEndEvent, false);
    }
}
