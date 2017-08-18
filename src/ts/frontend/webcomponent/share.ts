namespace share {
    const MODAL_ID = "share-modal";
    function GetModalElem() {
        return $(`#${MODAL_ID}`);
    }
    export function Show(): void {
        GetModalElem().modal('show');
    }
    export function Close(): void {
        GetModalElem().modal('hide');
    }
}