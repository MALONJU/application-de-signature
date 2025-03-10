<template>
    <section class="">
      <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%)">
        <div class="container">
          <div class="row gx-lg-5 align-items-center">
            <div class="col-lg-6 mb-5 mb-lg-0">
              <h1 class="my-5 display-3 fw-bold ls-tight">
                The best offer <br />
                <span class="text-primary">for your business</span>
              </h1>
              <p style="color: hsl(217, 10%, 50.8%)">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
  
            <div class="col-lg-6 mb-5 mb-lg-0">
              <div class="card">
                <div class="card-body py-5 px-md-5">
                  <form @submit.prevent="login">
                    <div class="form-outline mb-4">
                      <input v-model="email" type="email" class="form-control" required placeholder="Email address" />
                      <label class="form-label">Email address</label>
                    </div>
  
                    <div class="form-outline mb-4">
                      <input v-model="password" type="password" class="form-control" required placeholder="Password" />
                      <label class="form-label">Password</label>
                    </div>
  
                    <button type="submit" class="btn btn-primary btn-block mb-4">Se connecter</button>
  
                    <p v-if="message" :class="messageType">{{ message }}</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        message: '',
        messageType: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:3000/users/login', {
            email: this.email,
            password: this.password
          });
  
          if (response.status === 200) {
            this.message = 'Connexion réussie !';
            this.messageType = 'text-success';
  
            // Stocker le token et l'ID utilisateur dans localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
  
            // Rediriger vers la page d'accueil ou tableau de bord
            this.$router.push('/DashboardComponent'); 
          }
        } catch (error) {
          this.message = 'Erreur de connexion. Vérifie tes identifiants.';
          this.messageType = 'text-danger';
        }
      }
    }
  };
  </script>