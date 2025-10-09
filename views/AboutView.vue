<template>
  <div class="about">
    <h1>Informações do Usuário</h1>
    <div v-if="jwtData">
      <p>Nome de Usuário: {{ jwtData.jwt_sNomeUsuario }}</p>
      <p>Código da Empresa: {{ jwtData.jwt_nCodigoEmpresa }}</p>
      <p>Código do Usuário: {{ jwtData.jwt_nCodigoUsuario }}</p>
    </div>
    <div v-else>
      <p>Nenhum usuário autenticado</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref, onMounted } from 'vue'

// interface JwtPayload {
//   jwt_sNomeUsuario: string
//   jwt_nCodigoEmpresa: number
//   jwt_nCodigoUsuario: number
//   // Adicione outras propriedades conforme necessário
// }

// const jwtData = ref<JwtPayload | null>(null)

// function decodeJWT(token: string): JwtPayload | null {
//   try {
//     const base64Url = token.split('.')[1]
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//         .join(''),
//     )
//     return JSON.parse(jsonPayload)
//   } catch (error) {
//     console.error('Erro ao decodificar JWT:', error)
//     return null
//   }
// }

// onMounted(() => {
//   const token = localStorage.getItem('jwtToken')
//   if (token) {
//     jwtData.value = decodeJWT(token)
//   }
// })
</script>
