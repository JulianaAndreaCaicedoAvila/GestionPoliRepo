<script setup>
import { onMounted } from "vue";
import {
	useAuthStore,
	useProductoStore,
	useBancoStore,
	useEncuestaStore,
	usePreguntaStore,
	useNucleoStore,
	useIndicadorStore,
	useProgramaStore,
	useTemaStore,
	useClasificadorStore,
	useEscuelaStore,
	useNivelStore,
	useModuloStore,
	useGeografiaStore,
	useCursoStore,
} from "@/stores";
const storeClas = useClasificadorStore(),
	storeAuth = useAuthStore(),
	storeEncuesta = useEncuestaStore(),
	storePregunta = usePreguntaStore(),
	storeModulo = useModuloStore(),
	storeGeo = useGeografiaStore(),
	storeProductos = useProductoStore(),
	storeBancos = useBancoStore(),
	storeNucleos = useNucleoStore(),
	storeNiveles = useNivelStore(),
	storeTemas = useTemaStore(),
	storeEscuelas = useEscuelaStore(),
	storeIndicadores = useIndicadorStore(),
	storeProgramas = useProgramaStore(),
	storeCursos = useCursoStore();
onMounted(async () => {
	let items = await storeClas.cargar();
	items = await storeClas.tipos();
	items = await storeAuth.getRoles();
	items = await storeGeo.dptoAll();
	items = await storeGeo.munAll();
	items = await storeProductos.all();
	items = await storeModulo.all();
	items = await storeEncuesta.all();
	items = await storePregunta.all();
	items = await storeBancos.all();
	items = await storeTemas.all();
	items = await storeNucleos.all();
	items = await storeNiveles.all();
	items = await storeEscuelas.all();
	items = await storeIndicadores.all();
	items = await storeProgramas.all();
	items = await storeCursos.publicados();
});
</script>