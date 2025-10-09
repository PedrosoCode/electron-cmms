<script setup lang="ts">
import MainNavbar from '@/components/MainNavbar.vue'
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ModalConfirmacao from '../components/ModalConfirmacao.vue'

const bGatilhoModalCofirmacao = ref<boolean>(false)
const bGatilhoModalCofirmacaoDelete = ref<boolean>(false)

interface stFormInfo {
  sRazaoSocialParceiro: string
  sNomeFantasiaParceiro: string
  nCodigoTipoParceiro: number
  sTipoParceiroNegocio: string
  sEmailParceiro: string
  sDocumentoParceiro: string
  sTelefoneParceiro: string
  sContatoParceiro: string
  sLogradouro: string
  sBairroParceiro: string
  sComplementoParceiro: string
  sNumeroParceiro: string
  sCepParceiro: string
  nCodigoPaisParceiro: number | null
  nCodigoCidadeParceiro: number | null
  nCodigoEstadoParceiro: number | null
}

const stFormInfo = reactive<stFormInfo>({
  sRazaoSocialParceiro: '',
  sNomeFantasiaParceiro: '',
  nCodigoTipoParceiro: 0,
  sTipoParceiroNegocio: '',
  sEmailParceiro: '',
  sDocumentoParceiro: '',
  sTelefoneParceiro: '',
  sContatoParceiro: '',
  sLogradouro: '',
  sBairroParceiro: '',
  sComplementoParceiro: '',
  sNumeroParceiro: '',
  sCepParceiro: '',
  nCodigoPaisParceiro: null,
  nCodigoCidadeParceiro: null,
  nCodigoEstadoParceiro: null,
})

const DadosParceiro = ref<stFormInfo[]>([])

interface stateCboPais {
  nCodigoPais: number
  sNomePais: string
  nUfCidade: number
}
const stCboPais = ref<stateCboPais[]>([])

interface stateComboCidade {
  nCodigoCidade: number
  sDescricaoCidade: string
  nUfCidade: number
}
const stCboCidade = ref<stateComboCidade[]>([])

interface stateComboEstado {
  nCodigoEstado: number
  sNomeEstado: string
  sUF: string
}
const stCboEstado = ref<stateComboEstado[]>([])

interface stateComboTipoParceiro {
  sSigla: number
  sTipoParceiro: string
  nCodigoTipoParceiro: number
}
const stCboTipoParceiro = ref<stateComboTipoParceiro[]>([])

const route = useRoute();
const jwtToken = localStorage.getItem('jwtToken')

const urlCodigoParceiro: number | null = route.params.id === undefined || isNaN(Number(route.params.id))
  ? null
  : Number(route.params.id);


function GerenciaModalConfirmacaoEnviar(bool: Boolean) {
  try {

    if (bool) {

      bGatilhoModalCofirmacao.value = false

      axios.post(import.meta.env.VITE_DEFAULT_API_LINK + '/cadparceiros/upsert_parceiro', {
        nCodigoParceiro: urlCodigoParceiro,
        sRazaoSocial: stFormInfo.sRazaoSocialParceiro,
        sNomeFantasia: stFormInfo.sNomeFantasiaParceiro,
        sTipoParceiro: stFormInfo.sTipoParceiroNegocio,
        nTipoParceiro: stFormInfo.nCodigoTipoParceiro,
        sEmail: stFormInfo.sEmailParceiro,
        sDocumento: stFormInfo.sDocumentoParceiro,
        sTelefone: stFormInfo.sTelefoneParceiro,
        sContato: stFormInfo.sContatoParceiro,
        sLogradouro: stFormInfo.sLogradouro,
        sBairro: stFormInfo.sBairroParceiro,
        sComplemento: stFormInfo.sComplementoParceiro,
        sNumero: stFormInfo.sNumeroParceiro,
        sCep: stFormInfo.sCepParceiro,
        nCodigoPais: stFormInfo.nCodigoPaisParceiro,
        nCodigoCidade: stFormInfo.nCodigoCidadeParceiro,
        nCodigoEstado: stFormInfo.nCodigoEstadoParceiro,
      })
        .catch((error) => console.log(error))
    }

    router.push('/listaparceiro')

  } catch (error) {
    console.error(error)
    alert('Ocorreu um erro. Por favor, tente novamente.')
  }

}

function GerenciaModalConfirmacaoDeleteEnviar(bool: Boolean) {
  try {

    if (bool) {

      bGatilhoModalCofirmacao.value = false

      axios.post(import.meta.env.VITE_DEFAULT_API_LINK + '/cadparceiros/delete_parceiro', {
        nCodigoParceiro: urlCodigoParceiro
      })
        .catch((error) => console.log(error))
    }

    router.push('/listaparceiro')

  } catch (error) {
    console.error(error)
    alert('Ocorreu um erro. Por favor, tente novamente.')
  }

}

function btnEnviarClick() {
  try {

    bGatilhoModalCofirmacao.value = true

  } catch (error) {
    console.error(error)
    alert('Ocorreu um erro. Por favor, tente novamente.')
  }
}

function btnExcluirClick() {
  try {

    bGatilhoModalCofirmacaoDelete.value = true

  } catch (error) {
    console.error(error)
    alert('Ocorreu um erro. Por favor, tente novamente.')
  }
}

async function LoadComboTipoParceiro() {
  try {
    const response = await axios.get(import.meta.env.VITE_DEFAULT_API_LINK + '/genericos/tipo_parceiro')
    stCboTipoParceiro.value = response.data
    //console.log('Dados carregados:', stCboTipoParceiro.value)
  } catch (error) {
    console.error('Erro ao carregar tipo parceiro:', error)
  }
}


async function loadComboPais() {
  try {
    const response = await axios.get(import.meta.env.VITE_DEFAULT_API_LINK + '/genericos/pais')
    stCboPais.value = response.data
    //console.log('Dados carregados:', stCboPais.value)
  } catch (error) {
    console.error('Erro ao carregar países:', error)
  }
}

async function loadComboCidade(nCodigoEstado: number | null) {
  try {
    const response = await axios.request({
      method: 'POST',
      url: import.meta.env.VITE_DEFAULT_API_LINK + '/genericos/cidade',
      data: { nCodigoEstado },
    })
    stCboCidade.value = response.data
    //console.log('Dados carregados:', stCboCidade.value)
  } catch (error) {
    console.error('Erro ao carregar Cidades:', error)
  }
}

async function loadComboEstado() {
  try {
    const response = await axios.get(import.meta.env.VITE_DEFAULT_API_LINK + '/genericos/estado')
    stCboEstado.value = response.data
    //console.log('Dados carregados:', stCboEstado.value)
  } catch (error) {
    console.error('Erro ao carregar estados/uf:', error)
  }
}

async function LoadDadosParceiro(nCodigoParceiro: number | null) {

  if (nCodigoParceiro != null) {

    try {

      const response = await axios.post(import.meta.env.VITE_DEFAULT_API_LINK + '/cadparceiros/lista_unico',
        { nCodigoParceiro: nCodigoParceiro },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      )

      DadosParceiro.value = response.data
      Object.assign(stFormInfo, response.data[0])

    } catch (error) {
      console.log("erro ao carregar dados do parceiro", error)
    }

  }
}

async function loadCombos() {
  await Promise.all([
    loadComboPais(),
    loadComboEstado(),
    LoadComboTipoParceiro(),
  ]);

  await LoadDadosParceiro(urlCodigoParceiro);

  if (stFormInfo.nCodigoEstadoParceiro) {
    await loadComboCidade(stFormInfo.nCodigoEstadoParceiro);
  }
}

function ComboEstadoSelectedChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const codigoEstado = target.value ? Number(target.value) : null
  loadComboCidade(codigoEstado)
}

onMounted(() => {
  loadCombos()
})
</script>
<template>
  <main class="min-h-screen bg-slate-100 py-4">

    <!-- Modal Confirmação envio -->
    <ModalConfirmacao 
      v-if="bGatilhoModalCofirmacao"
      titulo="Atualizar dados"
      mensagem="Deseja confirmar a operação?"
      textoBotaoConfirmar="Confirmar"
      textoBotaoCancelar="Cancelar"
      corBotaoConfirmar="indigo"
      corBotaoCancelar="red"
      @confirmar="() => GerenciaModalConfirmacaoEnviar(true)"
      @cancelar="bGatilhoModalCofirmacao = false"
    />

    <!-- Modal Confirmação delete -->
     <ModalConfirmacao 
      v-if="bGatilhoModalCofirmacaoDelete"
      titulo="Deletar dados"
      mensagem="Deseja confirmar a exclusão?"
      textoBotaoConfirmar="Confirmar"
      textoBotaoCancelar="Cancelar"
      corBotaoConfirmar="indigo"
      corBotaoCancelar="red"
      @confirmar="() => GerenciaModalConfirmacaoDeleteEnviar(true)"
      @cancelar="bGatilhoModalCofirmacaoDelete = false"
    />


    <!-- Container com largura máxima maior em desktop -->
    <div class="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-center text-2xl font-semibold mb-6 text-gray-800">Cadastro de Parceiros de Negócio</h1>
      <div class="space-y-6">
        <!-- Datas -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Data do Cadastro</label>
            <input type="date" disabled class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Data Última Alteração</label>
            <input type="date" disabled class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50" />
          </div>
        </div>

        <!-- Razão Social e Nome Fantasia -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Razão Social</label>
            <input v-model="stFormInfo.sRazaoSocialParceiro" type="text" required placeholder="Insira a razão social"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-indigo-300" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Nome Fantasia</label>
            <input v-model="stFormInfo.sNomeFantasiaParceiro" type="text" required placeholder="Insira o Nome Fantasia"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-indigo-300" />
          </div>
        </div>

        <!-- Tipo Parceiro -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Tipo Parceiro</label>
          <select v-model="stFormInfo.sTipoParceiroNegocio"
            class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-indigo-300">
            <option :value="null">Selecione o Tipo de Parceiro</option>
            <option v-for="tipo in stCboTipoParceiro" :key="tipo.nCodigoTipoParceiro" :value="tipo.sTipoParceiro">
              {{ tipo.sTipoParceiro }}
            </option>
          </select>
        </div>

        <!-- Contato -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">E-Mail</label>
            <input v-model="stFormInfo.sEmailParceiro" type="email" placeholder="Insira o E-mail"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-indigo-300" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Telefone</label>
            <input v-model="stFormInfo.sTelefoneParceiro" type="tel" placeholder="Insira o Telefone"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-indigo-300" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Contato</label>
            <input v-model="stFormInfo.sContatoParceiro" type="text" placeholder="Insira o Contato"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-indigo-300" />
          </div>
        </div>

        <!-- Endereço -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Logradouro</label>
            <input v-model="stFormInfo.sLogradouro" type="text" placeholder="Insira o logradouro"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-indigo-300" />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Bairro</label>
              <input v-model="stFormInfo.sBairroParceiro" type="text" placeholder="Insira o Bairro"
                class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-indigo-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Complemento</label>
              <input v-model="stFormInfo.sComplementoParceiro" type="text" placeholder="Complemento (opcional)"
                class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-indigo-300" />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Número</label>
              <input v-model="stFormInfo.sNumeroParceiro" type="text" placeholder="Insira o N°"
                class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-indigo-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">CEP</label>
              <input v-model="stFormInfo.sCepParceiro" type="text" placeholder="Insira o CEP"
                class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-indigo-300" />
            </div>
          </div>
        </div>

        <!-- País, Estado, Cidade -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">País</label>
            <select v-model="stFormInfo.nCodigoPaisParceiro"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-indigo-300">
              <option v-for="pais in stCboPais" :key="pais.nCodigoPais" :value="pais.nCodigoPais">
                {{ pais.sNomePais }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Estado</label>
            <select v-model="stFormInfo.nCodigoEstadoParceiro" @change="ComboEstadoSelectedChange"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-indigo-300">
              <option :value="null">Selecione um estado</option>
              <option v-for="estado in stCboEstado" :key="estado.nCodigoEstado" :value="estado.nCodigoEstado">{{
                estado.sNomeEstado }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Cidade</label>
            <select v-model="stFormInfo.nCodigoCidadeParceiro"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-indigo-300">
              <option v-for="cidade in stCboCidade" :key="cidade.nCodigoCidade" :value="cidade.nCodigoCidade">
                {{ cidade.sDescricaoCidade }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-row justify-end space-x-4">
          <!-- Botão Excluir -->
          <div class="text-right">
            <button v-if="urlCodigoParceiro" @click="btnExcluirClick"
              class="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-indigo-700">Excluir</button>
          </div>

          <!-- Botão Enviar -->
          <div class="text-right">
            <button @click="btnEnviarClick"
              class="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Enviar</button>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>