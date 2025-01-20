// Contact Form Handling
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  // Only runs contact form code if the form exists on the page
  if (contactForm) {
    const successMessage = document.getElementById("successMessage");

    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Form validation function
    function validateForm(formData) {
      let isValid = true;
      const errors = {
        name: "",
        email: "",
        message: "",
      };

      // Reset previous errors
      document.querySelectorAll(".form-group").forEach((group) => {
        group.classList.remove("error");
        group.querySelector("[data-error]").textContent = "";
      });

      // Validate Name
      if (!formData.get("name").trim()) {
        errors.name = "Name is required";
        isValid = false;
      }

      // Validate Email
      const email = formData.get("email").trim();
      if (!email) {
        errors.email = "Email is required";
        isValid = false;
      } else if (!emailPattern.test(email)) {
        errors.email = "Please enter a valid email address";
        isValid = false;
      }

      // Validate Message
      if (!formData.get("message").trim()) {
        errors.message = "Message is required";
        isValid = false;
      }

      // Display errors if any
      if (!isValid) {
        Object.keys(errors).forEach((field) => {
          if (errors[field]) {
            const group = document
              .querySelector(`#${field}`)
              .closest(".form-group");
            group.classList.add("error");
            group.querySelector("[data-error]").textContent = errors[field];
          }
        });
      }

      return isValid;
    }

    // Form submission handler
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);

      if (validateForm(formData)) {
        // Hide any existing error messages
        document.querySelectorAll(".form-group").forEach((group) => {
          group.classList.remove("error");
          group.querySelector("[data-error]").textContent = "";
        });

        // Simulate form submission
        console.log("Form submitted successfully");
        console.log("Name:", formData.get("name"));
        console.log("Email:", formData.get("email"));
        console.log("Message:", formData.get("message"));

        // Show success message
        successMessage.classList.remove("hidden");

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.add("hidden");
        }, 5000);
      }
    });

    // Real-time validation on input
    contactForm.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", () => {
        const group = input.closest(".form-group");
        if (group.classList.contains("error")) {
          const formData = new FormData(contactForm);
          validateForm(formData);
        }
      });
    });
  }
});
