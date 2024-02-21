import {contactDataListType,contactDataList,loadData} from './data';
import {deleteContact} from './delete'
export {editContact}
const verticalSpace = document.createElement("br");
const editContact = (e:HTMLElement) => {
    const phoneNumber = e.parentElement!.parentElement!.children[3].getElementsByClassName('identifier')[0].innerHTML;
    const box = document.getElementById('details')!;
    let index = -1;
    for (let i = 0; i < contactDataList.length; i++) {
        if (contactDataList[i].phone === phoneNumber) {
            index = i;
            break;
        }
    }
    const contactBeingEdited = contactDataList[index];
    box.innerHTML = `
    <p class="identifier">${phoneNumber}</p>
    <h3 style="margin:5rem 1rem;">
        Are you sure you want to edit this contact ?
    </h3>
    <br>
    <button type="button" class="addButton" data-toggle="modal" data-target="#myModaledit">EDIT</button>
    <button type="button" class="addButton" id="edit-close">Close</button>
        <div class="modal fade" id="myModaledit" role="dialog">
            <div class="modal-dialog">
            <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit Contact</h4>
                    </div>
                    <div class="modal-body" style="text-align:center">
                        <input type="text" value="${contactBeingEdited.name}" class="searchbar" placeholder="Name" id="edit-name"/>
                        <input type="text" value="${contactBeingEdited.email}" class="searchbar" placeholder="Email" id="edit-email"/>
                        <input type="text" value="${contactBeingEdited.phone}" class="searchbar" placeholder="Phone" id="edit-phone"/>
                        <input type="text" value="${contactBeingEdited.desg}" class="searchbar" placeholder="Designation" id="edit-desg"/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" id="edit-save" data-dismiss="modal">Save the edit</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('edit-save')!.addEventListener("click", function() { saveEditedContact(index); });
    document.getElementById('edit-close')!.addEventListener("click",function() {backToDetailsByindex(index);})
}

//saved the new object back to the data array
const saveEditedContact = (index:number) => {
    const nname:string = (document.getElementById('edit-name') as HTMLInputElement | null)!.value;
    const nemail:string = (document.getElementById('edit-email')as HTMLInputElement | null)!.value;
    const nphone:string = (document.getElementById('edit-phone')as HTMLInputElement | null)!.value;
    const ndesg:string = (document.getElementById('edit-desg')as HTMLInputElement | null)!.value;
    console.log({nname,nemail,nphone,ndesg});
    if(nname !== '' && nphone !== '')
    {
        if(nphone.length !== 10)
        {
            alert('INVALID PHONE NUMBER, Please try again.');
            return;
        }
        contactDataList[index].name = nname;
        contactDataList[index].email = nemail;
        contactDataList[index].phone = nphone;
        contactDataList[index].desg = ndesg;
        loadData();
        backToDetailsByindex(index);
    }
    else
    {
        alert('either name or phone is invalid, try again');
    }
}

const backToDetailsByindex = (index:number) => {
    const detail = document.getElementById('details')!;
    detail.innerHTML = '';
    const ObjAfterEdit = contactDataList[index];

    const displaypicbar = document.createElement('div');
    displaypicbar.className = "dpbar";
    const dpbarSection1 = document.createElement("div");

    dpbarSection1.classList.add("dpbar-section1");
    const dpbarSection1Pic = document.createElement("h1");
    dpbarSection1Pic.classList.add("dpbar-section1-pic");
    dpbarSection1Pic.innerHTML = ObjAfterEdit.name[0];
    dpbarSection1.appendChild(dpbarSection1Pic);

    const dpbarSection2 = document.createElement("div");
    dpbarSection2.classList.add("dpbar-section2");

    const deleteButton = document.createElement("h4");
    deleteButton.classList.add("dpbar-section2-del");
    deleteButton.addEventListener("click", function() { deleteContact(this); });
    deleteButton.innerHTML = "DELETE";

    const editButton = document.createElement("h4");
    editButton.classList.add("dpbar-section2-edit");
    editButton.addEventListener("click", function() { editContact(this); });
    editButton.innerHTML = "Edit";

    dpbarSection2.appendChild(deleteButton);
    dpbarSection2.appendChild(editButton);

    const horizontalline = document.createElement("hr");

    const detailSection = document.createElement('div');
    detailSection.classList.add('details-section');

    const detailsName = document.createElement('h1');
    detailsName.style.fontSize = '8rem';
    detailsName.innerHTML = ObjAfterEdit.name;
    detailSection.appendChild(detailsName);
    const detailsDesignation = document.createElement("h3");
    detailsDesignation.innerHTML = ObjAfterEdit.desg;
    detailSection.appendChild(detailsDesignation);
    detailSection.appendChild(verticalSpace);
    const detailsEmail = document.createElement("h2");
    detailsEmail.innerHTML = `EMAIL : ${ObjAfterEdit.email}`;
    detailSection.appendChild(detailsEmail);
    const detailsPhone = document.createElement("h2");
    detailsPhone.innerHTML = `PHONE : ${ObjAfterEdit.phone}`;
    detailSection.appendChild(detailsPhone);
    const detailsProfession = document.createElement("h2");
    detailsProfession.innerHTML = `DESIGNATION : ${ObjAfterEdit.desg}`;
    detailSection.appendChild(detailsProfession);
    const phoneid = document.createElement("p");
    phoneid.classList.add("identifier");
    phoneid.innerHTML = ObjAfterEdit.phone;
    detailSection.appendChild(phoneid);

    displaypicbar.appendChild(dpbarSection1);
    displaypicbar.appendChild(dpbarSection2);
    displaypicbar.appendChild(horizontalline);
    displaypicbar.appendChild(detailSection);

    detail.appendChild(displaypicbar);
}