class MainController {
  index(req, res) {
    console.log("-> Received Request " + req.method);
    console.log("Request Body:", req.body); // Logging the request body
    console.log("Query Parameters:", req.query); // Logging query parameters
    res.render("Index", { title: "Index", isLoggedIn: true });
  }         

  about(req, res) {
    res.render("About", { title: "About us ", isLoggedIn: false });
  }

  login(req, res) {
    res.status(404).json({ msg: "hi" });
  }

  sendForm(req, res) {
    res.render("Form");
  }

  submit(req, res) {
    // The parsed form data is available in req.body
    const formData = req.body;
    // Process the data or send a response
    console.log(`Received form data: ${JSON.stringify(formData)}`);

    res.render("index", { title: "U have been signed!" });
  }
}

module.exports = MainController;
