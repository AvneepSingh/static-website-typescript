import {contactDataListType,contactDataList,loadData} from './data';
export {deleteContact};
const deleteContact = (element:HTMLElement) => {
    if (confirm('Are you sure,You want to delete this contact?') === false)
        return;
    const phoneNumber = element.parentElement!.parentElement!.children[3].getElementsByClassName('identifier')[0].innerHTML;
    for (let i = 0; i < contactDataList.length; i++) {
        if (contactDataList[i].phone === phoneNumber)
            contactDataList.splice(i, 1);
    }
    let detail = document.getElementById('details')!;
    detail.innerHTML = '';
    loadData();
}