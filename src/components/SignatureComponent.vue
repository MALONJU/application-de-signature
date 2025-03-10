<template>
  <div>
    <h1>Signature Requise</h1>
    <canvas ref="signatureCanvas" class="signature-canvas"></canvas>
    <div>
      <button @click="clearCanvas" class="btn btn-warning">Effacer</button>
      <button @click="submitSignature" class="btn btn-success">Soumettre</button>
    </div>
  </div>
</template>

<script>
import SignaturePad from 'signature_pad';
import axios from 'axios';

export default {
  data() {
    return {
      signaturePad: null,
      token: this.$route.params.token,  // Récupère le token depuis l'URL
    };
  },
  methods: {
    clearCanvas() {
      this.signaturePad.clear();
    },
    submitSignature() {
  const signatureData = this.signaturePad.toDataURL(); // Récupère l'image de la signature

  console.log("Signature capturée :", signatureData.substring(0, 100)); // Affiche les 100 premiers caractères pour éviter d'afficher une énorme base64

  // Envoie la signature au backend
  axios.post(`http://localhost:3000/students/validate-signature/${this.token}`, {
    signature: signatureData
  })
  .then(() => {
    alert('Signature validée avec succès!');
    this.$router.push('/DashboardComponent');
  })
  .catch(error => {
    console.error('Erreur lors de la soumission de la signature', error.response ? error.response.data : error);
  });
}
  },
  mounted() {
  const canvas = this.$refs.signatureCanvas;

  // Définir une taille correcte pour le canvas
  canvas.width = 500;
  canvas.height = 300;

  this.signaturePad = new SignaturePad(canvas, {
    penColor: 'black',
    backgroundColor: 'white' // S'assurer que le fond est blanc
  });

  console.log("Canvas SignaturePad initialisé !");
}

};
</script>

<style scoped>
.signature-canvas {
  border: 1px solid #ccc;
  width: 100%;
  height: 300px;
}

button {
  margin-top: 10px;
}
</style>
