
const toggleDropdown = (dropdown, menu, isOpen) => {
    dropdown.classList.toggle("open", isOpen);
    menu.style.height = isOpen ? `${menu.scrollHeight}px` : 0;
  };
  
  const closeAllDropdowns = () => {
    document.querySelectorAll(".dropdown-container.open").forEach((openDropdown) => {
      toggleDropdown(openDropdown, openDropdown.querySelector(".dropdown-menu"), false);
    });
  };
 
  document.querySelectorAll(".dropdown-toggle").forEach((dropdownToggle) => {
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const dropdown = dropdownToggle.closest(".dropdown-container");
      const menu = dropdown.querySelector(".dropdown-menu");
      const isOpen = dropdown.classList.contains("open");
      closeAllDropdowns(); 
      toggleDropdown(dropdown, menu, !isOpen); 
    });
  });
 
  document.querySelectorAll(".sidebar-toggler, .sidebar-menu-button").forEach((button) => {
    button.addEventListener("click", () => {
      closeAllDropdowns(); 
      document.querySelector(".sidebar").classList.toggle("collapsed"); 
    });
  });



  document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const openBtn = document.getElementById("openSidebarBtn");
    const chatSidebar = document.getElementById("chat-sidebar"); 
  
    // Deschide meniul principal
    openBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Previi închiderea instantă
  
      // Închide chat-sidebar dacă e deschis
      if (chatSidebar.classList.contains("active")) {
        chatSidebar.classList.remove("active");
      }
  
      // Toggle pentru sidebar principal
      sidebar.classList.toggle("visible");
    });
  
    // Închide sidebar principal dacă dai click în afară
    document.addEventListener("click", (e) => {
      if (!sidebar.contains(e.target) && !openBtn.contains(e.target)) {
        sidebar.classList.remove("visible");
      }
    });
  });
  