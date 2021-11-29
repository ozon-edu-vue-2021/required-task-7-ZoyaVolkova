const contactsList = document.querySelector(".contacts-list");
const detailsView = document.querySelector(".details-view");

detailsView.classList.add("hidden");

const displayContacts = (contacts) => {
  const htmlString = contacts
    .map((contact) => {
      return `<li id=${contact.name}><strong>${contact.name}</strong></li>`;
    })
    .join("");
  contactsList.innerHTML = htmlString;
};

const displayFriends = (contacts, id) => {
  const contact = contacts.find((a) => a.name === id);
  const notFriends = contacts
    .filter(
      (a) =>
        a.id !== contact.id &&
        a.id !== contact.friends[0] &&
        a.id !== contact.friends[1] &&
        a.id !== contact.friends[2]
    )
    .slice(0, 3);

  const popularFriends = [...contacts]
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    .sort((a, b) => {
      return b.repeat - a.repeat;
    })
    .slice(0, 3);

  const string = `<div class="back"></div>
  <div class="background"></div><div class="photo"></div><div class="name">${
    contact.name
  }</div>
  <div>
    <ul>
      <li class="people-title">Друзья</li>
      ${contact.friends
        .map((friend) => {
          return `<li><i class="fa fa-male"></i><span>${
            contacts.find((a) => a.id === friend).name
          }</span></li>`;
        })
        .join("")}
        <li class="people-title">Не в друзьях</li>
        ${notFriends
          .map((a) => {
            return `<li><i class="fa fa-male"></i><span>${a.name}</span></li>`;
          })
          .join("")}
          <li class="people-title">Популярные люди</li> 
          ${popularFriends
            .map((a) => {
              return `<li><i class="fa fa-male"></i><span>${a.name}</span></li>`;
            })
            .join("")}

    </ul>
  </div>`;
  detailsView.innerHTML = string;
};
const toggleHidden = () => {
  detailsView.classList.toggle("hidden");
  contactsList.classList.toggle("hidden");
};
const getContacts = async () => {
  try {
    const res = await fetch("data.json");
    contacts = await res.json();
    displayContacts(contacts);
    const friends = [];
    contacts.forEach((a) => {
      a.friends.forEach((friend) => {
        friends.push(friend);
      });
    });
    contacts.forEach((contact) => {
      contact.repeat = friends.filter((a) => a === contact.id).length;
    });
    contactsList.querySelectorAll("li").forEach((contact) => {
      contact.addEventListener("click", () => {
        toggleHidden();
        displayFriends(contacts, contact.id);
        detailsView.querySelector(".back").addEventListener("click", () => {
          toggleHidden();
        });
      });
    });
  } catch (err) {
    console.error("Error", err);
  }
};

getContacts();
