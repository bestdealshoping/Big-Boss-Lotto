function generateSellerId(){

return "BBL-" +

Math.floor(
10000 + Math.random()*90000
);

}

function generateSecretCode(){

const chars =
"ABCDEFGHJKLMNPQRSTUVWXYZ123456789";

let code = "";

for(let i=0;i<6;i++){

code += chars.charAt(

Math.floor(
Math.random()*chars.length
)

);

}

return code;

}

async function createSeller(){

const seller = {

fullName:
document.getElementById("fullName").value,

address:
document.getElementById("address").value,

phone:
document.getElementById("phone").value,

email:
document.getElementById("email").value,

sellerId:
generateSellerId(),

secretCode:
generateSecretCode(),

status:"active",

createdAt:
new Date()

};

await db.collection("sellers")
.add(seller);

alert("Vendeur ajouté");

loadSellers();

}

async function loadSellers(){

const table =
document.getElementById("sellerTable");

table.innerHTML = "";

const snapshot =
await db.collection("sellers").get();

snapshot.forEach((doc)=>{

const seller = doc.data();

table.innerHTML += `

<tr>

<td>${seller.fullName}</td>

<td>${seller.phone}</td>

<td>${seller.sellerId}</td>

<td>${seller.secretCode}</td>

<td>

<button
onclick="deleteSeller('${doc.id}')">

Supprimer

</button>

</td>

</tr>

`;

});

}

async function deleteSeller(id){

await db.collection("sellers")
.doc(id)
.delete();

loadSellers();

}

loadSellers();