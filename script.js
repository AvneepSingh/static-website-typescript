import { contactDataList } from './data.js';
import { deleteContact } from './delete.js';
import { editContact } from './edit.js';
const verticalSpace = document.createElement("br");
let newcontactDataList = [];
const runSearch = (searchValue) => {
    const query = searchValue.trim();
    console.log(contactDataList);
    newcontactDataList = [];
    contactDataList.forEach(function(element) {
        if (element.name.includes(query))
            newcontactDataList.push(element);
    });
    let list = document.getElementById('contactList');
    list.innerHTML = "";
    for (let i = 0; i < newcontactDataList.length; i++) {
        const slab = document.createElement("div");
        slab.className = "contactlist-elements";
        slab.addEventListener("click", () => {
            viewDetails(newcontactDataList[i].phone);
        });
        const nameheading = document.createElement("h3");
        nameheading.id = "nameinlist";
        nameheading.innerHTML = newcontactDataList[i].name;
        const Designation = document.createElement("p");
        Designation.classList.add("contactlist-elements-cnt");
        Designation.innerHTML = newcontactDataList[i].desg;
        const picture = document.createElement("h2");
        picture.classList.add("contactlist-elements-pic");
        picture.innerHTML = newcontactDataList[i].name[0];
        const phoneid = document.createElement("p");
        phoneid.classList.add("identifier");
        phoneid.innerHTML = newcontactDataList[i].phone;
        slab.appendChild(nameheading);
        slab.appendChild(Designation);
        slab.appendChild(picture);
        slab.appendChild(phoneid);
        list.appendChild(slab);
    }
};
const createNewContact = () => {
    const newname = document.getElementById('add-new-name').value;
    const newemail = document.getElementById('add-new-email').value;
    const newphone = document.getElementById('add-new-phone').value;
    const newdesg = document.getElementById('add-new-desg').value;
    const data = { name: newname, email: (newemail == '' ? ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' : newemail), phone: newphone, desg: (newemail == '' ? ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' : newdesg) };
    if (newname !== '' && newphone !== '') {
        let flag = 1;
        for (let i = 0; i < contactDataList.length; i++)
            if (contactDataList[i].phone == newphone)
                flag = 0;
        if (flag) {
            contactDataList.unshift(data);
        } else {
            alert('A contact with same phone number already exists.');
        }
    } else {
        alert('please enter a name and a phone number');
    }
    loadData();
};
const loadData = () => {
    let list = document.getElementById('contactList');
    list.innerHTML = "";
    contactDataList.forEach(function(element) {
        const slab = document.createElement("div");
        slab.className = "contactlist-elements";
        slab.addEventListener("click", () => {
            viewDetails(element.phone);
        });
        const nameheading = document.createElement("h3");
        nameheading.id = "nameinlist";
        nameheading.innerHTML = element.name;
        const Designation = document.createElement("p");
        Designation.classList.add("contactlist-elements-cnt");
        Designation.innerHTML = element.desg;
        const picture = document.createElement("h2");
        picture.classList.add("contactlist-elements-pic");
        picture.innerHTML = element.name[0].toUpperCase();
        const phoneid = document.createElement("p");
        phoneid.classList.add("identifier");
        phoneid.innerHTML = element.phone;
        slab.appendChild(nameheading);
        slab.appendChild(Designation);
        slab.appendChild(picture);
        slab.appendChild(phoneid);
        list.appendChild(slab);
    });
};
const viewDetails = (phone) => {
    const detail = document.getElementById('details');
    detail.innerHTML = '';
    const A = contactDataList.filter(obj => { return obj.phone === phone; })[0];
    const displaypicbar = document.createElement('div');
    displaypicbar.className = "dpbar";
    const dpbarSection1 = document.createElement("div");
    dpbarSection1.classList.add("dpbar-section1");
    const dpbarSection1Pic = document.createElement("h1");
    dpbarSection1Pic.classList.add("dpbar-section1-pic");
    dpbarSection1Pic.innerHTML = A.name[0];
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
    detailsName.innerHTML = A.name;
    detailSection.appendChild(detailsName);
    const detailsDesignation = document.createElement("h3");
    detailsDesignation.innerHTML = A.desg;
    detailSection.appendChild(detailsDesignation);
    detailSection.appendChild(verticalSpace);
    const detailsEmail = document.createElement("h2");
    detailsEmail.innerHTML = `EMAIL : ${A.email}`;
    detailSection.appendChild(detailsEmail);
    const detailsPhone = document.createElement("h2");
    detailsPhone.innerHTML = `PHONE : ${A.phone}`;
    detailSection.appendChild(detailsPhone);
    const detailsProfession = document.createElement("h2");
    detailsProfession.innerHTML = `DESIGNATION : ${A.desg}`;
    detailSection.appendChild(detailsProfession);
    const phoneid = document.createElement("p");
    phoneid.classList.add("identifier");
    phoneid.innerHTML = A.phone;
    detailSection.appendChild(phoneid);
    displaypicbar.appendChild(dpbarSection1);
    displaypicbar.appendChild(dpbarSection2);
    displaypicbar.appendChild(horizontalline);
    displaypicbar.appendChild(detailSection);
    detail.appendChild(displaypicbar);
};
window.onload = loadData();
const SEARCH = document.getElementById('searchtab');
SEARCH.addEventListener('keyup', function() { runSearch(this.value); });
const SAVENEWONE = document.getElementById('saveNewOne');
SAVENEWONE === null || SAVENEWONE === void 0 ? void 0 : SAVENEWONE.addEventListener('click', function() { createNewContact(); });