<template>
  <div>
    <h1>Liste des étudiants</h1>
    <button class="btn btn-primary" @click="showPopup = true">Ajouter</button>

    <table class="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Filière</th>
          <th>Niveau</th>
          <th>Signature</th>
          <th>Statut</th> <!-- Nouvelle colonne pour afficher le statut de la signature -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student._id">
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.filiere }}</td>
          <td>{{ student.niveau }}</td>
          <td>
            <button class="btn btn-link" 
                    @click="sendSignature(student._id)" 
                    v-if="student.status === 'En attente' || student.status === 'Expiré'">
              Envoyer Signature
            </button>
            <span v-else class="badge bg-success">Signé</span>
          </td>
          <td>
            <span>{{ student.signed ? 'Signé' : 'En attente' }}</span> <!-- Affiche le statut -->
          </td>
        </tr>
      </tbody>
    </table>

  <!-- POP-UP Formulaire Ajouter Étudiant -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <h3>Ajouter un étudiant</h3>
        <form @submit.prevent="addStudent">
          <input type="text" v-model="newStudent.name" placeholder="Nom" required />
          <input type="email" v-model="newStudent.email" placeholder="Email" required />
          <input type="text" v-model="newStudent.filiere" placeholder="Filière" required />
          <input type="text" v-model="newStudent.niveau" placeholder="Niveau" required />
          <button type="submit" class="btn btn-success">Ajouter</button>
          <button type="button" class="btn btn-danger" @click="showPopup = false">Annuler</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      students: [],
      showPopup: false,
      newStudent: { name: '', email: '', filiere: '', niveau: '' }
    };
  },
  methods: {
    async fetchStudents() {
    try {
        const response = await axios.get('http://localhost:3000/students');
        this.students = response.data.map(student => {
            const now = new Date();
            const expirationTime = new Date(student.signatureExpiration);

            if (student.signed) {
                student.status = 'Signé';
            } else if (student.signatureToken && now > expirationTime) {
                student.status = 'Expiré';
            } else {
                student.status = 'En attente';
            }

            return student;
        });
    } catch (error) {
        console.error('Erreur lors du chargement des étudiants', error);
    }
},
  async addStudent() {
    try {
      const response = await axios.post('http://localhost:3000/students/add', this.newStudent);
      this.students.push(response.data.student);
      this.showPopup = false;
      this.newStudent = { name: '', email: '', filiere: '', niveau: '' };
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'étudiant', error.response ? error.response.data : error);
    }
  },
  async sendSignature(studentId) {
    try {
      await axios.post(`http://localhost:3000/students/send-signature/${studentId}`);
      alert('Lien de signature envoyé avec succès !');
      this.fetchStudents();  // Recharger la liste après envoi du lien
    } catch (error) {
      console.error('Erreur lors de l\'envoi du lien', error);
    }
  }
},
  mounted() {
    this.fetchStudents();  // Appeler la méthode pour récupérer les étudiants lors du montage du composant

    setInterval(() => {
        this.fetchStudents();
    }, 30000)
  }
};
</script>

<style>
/* Style du pop-up */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.popup-content input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
</style>
