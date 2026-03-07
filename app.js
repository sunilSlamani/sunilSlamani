async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  // Demo mode login - works without Supabase configuration
  if (email === "admin@krishi.com" && password === "admin123") {
    const demoUser = { email: email, role: "admin", name: "Admin" };
    localStorage.setItem("user", JSON.stringify(demoUser));
    window.location.href = "admin.html";
    return;
  } else if (email === "farmer@krishi.com" && password === "farmer123") {
    const demoUser = { email: email, role: "farmer", name: "Farmer" };
    localStorage.setItem("user", JSON.stringify(demoUser));
    window.location.href = "former.html";
    return;
  }

  // Check if Supabase is configured
  if (window.SUPABASE_URL === "YOUR_SUPABASE_URL" || !window.SUPABASE_URL) {
    // Demo mode: check localStorage for added farmers
    const farmers = JSON.parse(localStorage.getItem("farmers") || "[]");
    const farmer = farmers.find(f => f.email === email && f.password === password);
    if (farmer) {
      localStorage.setItem("user", JSON.stringify(farmer));
      window.location.href = "former.html";
      return;
    }
    alert("Invalid email or password.\n\nDemo accounts:\n- Admin: admin@krishi.com / admin123\n- Farmer: farmer@krishi.com / farmer123");
    return;
  }

  try {
    const { data, error } = await supabase
      .from('farmers')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error) {
      console.error("Login error:", error);
      alert("Invalid email or password");
      return;
    }

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      if (data.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "former.html";
      }
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Login failed. Please check console for details.");
  }
}
