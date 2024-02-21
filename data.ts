export {contactDataListType,contactDataList,loadData,viewDetails};
import {deleteContact} from './delete';
import {editContact} from './edit';
interface contactDataListType
{
    name:string;
    phone:string;
    email:string;
    desg:string;
};

let contactDataList:contactDataListType[] = [{
    name: 'john',
    phone: '0123456789',
    email: 'john@john.com',
    desg: 'founder of john.com'
},
{
    name: 'jay',
    phone: '1234567890',
    email: 'jay@jay.com',
    desg: 'founder of jay.com'
},
{
    name: 'william',
    phone: '2345678910',
    email: 'will@will.com',
    desg: 'founder of will.com'
},
{
    name: 'trevor',
    phone: '3456789012',
    email: 'trevor@trevor.com',
    desg: 'founder of trevor.com'
},
{
    name: 'franklin',
    phone: '4567890123',
    email: 'frankie@franky.com',
    desg: 'founder of franky.com'
},
{
    name: 'jason',
    phone: '5678901234',
    email: 'josh@joson.com',
    desg: 'founder of joson.com'
},
{
    name: 'jim',
    phone: '6789012345',
    email: 'jimmy@jim.com',
    desg: 'founder of jim.com'
}
];

const loadData = () => {
    let list = document.getElementById('contactList')!;
    list.innerHTML = "";
    contactDataList.forEach(function(element) {
        const slab = document.createElement("div");
        slab.className = "contactlist-elements"
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
        picture.innerHTML = element.name[0];

        const phoneid = document.createElement("p");
        phoneid.classList.add("identifier");
        phoneid.innerHTML = element.phone;

        slab.appendChild(nameheading);
        slab.appendChild(Designation);
        slab.appendChild(picture);
        slab.appendChild(phoneid);
        list.appendChild(slab);
    });
}
const verticalSpace = document.createElement("br");
const viewDetails = (phone:string) => {
    const detail = document.getElementById('details')!;
    detail.innerHTML = '';

    const A = contactDataList.filter(obj => { return obj.phone === phone })[0];
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
}
