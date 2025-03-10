<template>
    <section class="vh-100" style="background-color: #9A616D;">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card" style="border-radius: 1rem;">
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="signup form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
  
                    <form @submit.prevent="registerUser">
  
                      <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Créer un compte</h5>
  
                      <div class="form-outline mb-4">
                        <input v-model="name" type="text" class="form-control form-control-lg" required />
                        <label class="form-label">Nom d'utilisateur</label>
                      </div>
  
                      <div class="form-outline mb-4">
                        <input v-model="email" type="email" class="form-control form-control-lg" required />
                        <label class="form-label">Adresse e-mail</label>
                      </div>
  
                      <div class="form-outline mb-4">
                        <input v-model="password" type="password" class="form-control form-control-lg" required />
                        <label class="form-label">Mot de passe</label>
                      </div>
  
                      <div class="pt-1 mb-4">
                        <button class="btn btn-dark btn-lg btn-block" type="submit">S'inscrire</button>
                      </div>
  
                      <p class="mb-5 pb-lg-2" style="color: #393f81;">Déjà un compte?
                        <router-link to="/LoginComponent" style="color: #393f81;">Connecte-toi ici</router-link>
                      </p>
  
                      <p v-if="message" :class="messageType">{{ message }}</p>
  
                    </form>
  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        message: '',
        messageType: ''
      };
    },
    methods: {
      async registerUser() {
        try {
            const response = await fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.name,
              email: this.email,
              password: this.password
            })
          });
  
          const data = await response.json();
  
          if (response.ok) {
            this.message = 'Inscription réussie !';
            this.messageType = 'text-success';
            this.$router.push('/LoginComponent'); // Redirige vers la page de connexion après succès
          } else {
            this.message = data.message || 'Erreur lors de l\'inscription';
            this.messageType = 'text-danger';
          }
  
        } catch (error) {
          console.error('Erreur:', error);
          this.message = 'Erreur interne du serveur.';
          this.messageType = 'text-danger';
        }
      }
    }
  };
  </script>
  