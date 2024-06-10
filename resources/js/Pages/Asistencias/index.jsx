import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import AdvertenciaBoton from '@/Components/AdvertenciaBoton';
import Swal from 'sweetalert2';
import { Result } from 'postcss';

export default function Dashboard(props) {
    const[modal,setModal] = useState(false);
    const[title,setTitle] = useState('');
    const[operation,setOperation] = useState(1);
    const dniInput = useRef();
    const tipo_eventoInput = useRef();
    const tiempoInput = useRef();
    const ip_publicaInput = useRef();
    const coordenadasInput = useRef();
    const {data,stData,delete:destroy,post,put,processing,reset,errros}= useForm(
         {id:'', dni:'', tipo_evento:'',tiempo:'',ip_publica:'',coordenadas:''

         });
       
    const openModal =(op,id,dni,tipo_evento,tiempo,ip_publica,coordenadas) =>{
         setModal(true);
         serOperation(op);
         SetData({dni:'', tipo_evento:'',tiempo:'',ip_publica:'',coordenadas:''});
         if(op === 1) {
            setTitle('Anadir auto');
         }else {
            setTitle('Modificar auto');
            setData({id:id,dni:dni,tipo_evento:tipo_evento,tiempo:tiempo,ip_publica:ip_publica,coordenadas:coordenadas});
         }
         }
         const closeModal = () => {
            setModal(false);
         }
         const save = (e) => {
           e.preventDefault();
            if(operation === 1){
            post(route('asistencias.store'), {
                onSuccess: () => {'Auto Guardado'},
                onError: () => {
                    if (errros.dni){
                        reset('dni');
                        dniInput.current.focus();

                    }
                    if (errros.tipo_evento){
                        reset('tipo_evento');
                        tipo_eventoInput.current.focus();
                    }
                    if (errros.tiempo){
                        reset('tiempo');
                        tiempoInput.current.focus();
                    }
                    if (errros.ip_publica){
                        reset('ip_publica');
                        ip_publicaInput.current.focus();
                    }
                    if (errros.coordenadas){
                        reset('coordenadas');
                        coordenadasInput.current.focus();
                    }
                }
            
            });
            
                }
                 else {
                    put(route('asistencias.update',data,id),{
                        onSuccess: () => {ok('Auto modificado')},
                        onError: () => {
                            if (errros.dni){
                                reset('dni');
                                dniInput.current.focus();
        
                            }
                            if (errros.tipo_evento){
                                reset('tipo_evento');
                                tipo_eventoInput.current.focus();
                            }
                            if (errros.tiempo){
                                reset('tiempo');
                                tiempoInput.current.focus();
                            }
                            if (errros.ip_publica){
                                reset('ip_publica');
                                ip_publicaInput.current.focus();
                            }
                            if (errros.coordenadas){
                                reset('coordenadas');
                                coordenadasInput.current.focus();
                            }
                        } 

                }); 
               
            }
        }
        
    const ok = ({mensaje}) =>{
        reset();
        closeModal();
        Swal.fire({title:'mensaje',icon:'success'});
         }
     const eliminar =(id, name) => {
        const alerta = Swal.mixin({buttonsStyling:true})
        alerta.fire({
            title:'Seguro  eliminar el auto'+name,
            text:'Se perderan el auto',
            icon:'Seguro',showCancelButton: true,
            confimButtonText:'<i class="fa-soiid fa-check"></i> SI, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelar'
        }).then((result) =>{
            if(result.isConfirmed) {
                destroy(route('asistencias.destroy','id')), {onSuccess: ()=>(ok('Auto eliminado'))};
            }
        }
        )
     }    
    return (
        <AuthenticatedLayout
            auth={props.auth}
            erros={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Asistencias</h2>} >
            <Head title="Asistencias" />
            <div className="bg-white grid v-screan place-items-center">
                <div className="mt-3 mb-3 flex justify-end">
                 <PrimaryButton onClick={() => openModal(1)}>
    <i className='fa-solid fa-plus-circle'>Anadir</i>

</PrimaryButton>
<div className="bg-white grid v-screan place-items-center py-6"> 
<table className="table-auto border border.gray-400">
    <thead className='bg-gray-100'>
        <tr className='px-2 py-2'>
        <th className='px-2 py-2'>#</th>
        <th className='px-2 py-2'>DNI</th>
        <th className='px-2 py-2'>TIPO DE EVENTO</th>
        <th className='px-2 py-2'>TIEMPO</th>
        <th className='px-2 py-2'>IP PÚBLICA</th>
        <th className='px-2 py-2'>COORDENADAS</th>
        </tr>
        </thead>
<tbody>
    {pros.asistencias.map((asistencias,i) => (
    
    <tr key={asistencias.id}>
        <td className='border border-gray-400 px-2 py-2'>{(i+1)}</td>
        <td className='border border-gray-400 px-2 py-2'>{(asistencias.dni)}</td>
        <td className='border border-gray-400 px-2 py-2'>{(+asistencias.tipo_evento+'-600')}</td>
        <td className='border border-gray-400 px-2 py-2'>{(asistencias.tiempo)}</td>
        <td className='border border-gray-400 px-2 py-2'>{(asistencias.ip_publica)}</td>
        <td className='border border-gray-400 px-2 py-2'>{(asistencias.coordenadas)}</td>
        
        <td className='border border-gray-400 px-2 py-2'>
            <AdvertenciaBoton  onClick={() => openModal(2,asistencias.id,asistencias.id,asistencias.tipo_evento,asistencias.tiempo,asistencias.ip_publica,asistencias.coordenadas)}>
                <i className ='fa-slid fa-edit'></i>

            </AdvertenciaBoton>
        </td>
        <td className='border border-gray-400 px-2 py-2'>
        <DangerButton onClick={()=> eliminar(asistencias.id,asistencias.dni)}>
                <i className ='fa-slid fa-trash'></i>

            </DangerButton>
        </td>
    </tr>
        
        
    
    
    ) )}
</tbody>

   
   
</table>

</div>

                </div>

            </div>

            <Modal show={modal} onClose={closeModal}>
            <h2 className="p-3 text-lg font-medium text-gray-900">
                       {title}
                    </h2>

                <form onSubmit={save} className="p-6">
                  <div className='mt-6'>
                    <InputLabel for="dni" value="dni"></InputLabel>
                    <TextInput id="dni" name="dni" ref={dniInput}
                    value={data.dni} required='required' handlechange={(e)=>setData('dni,e.target.value') }
                    className="mt-1 block w-3/4"  isFocused></TextInput>
                    <InputError message={errros.dni} classNamemt-2></InputError>
                  </div>
                  <div className='mt-6'>
                    <InputLabel for="tipo_evento" value="tipo_evento"></InputLabel>
                    <Select id="tipo_evento" name="tipo_evento" ref={tipo_eventoInput}
                    value={data.tipo_evento} required='required' handlechange={(e)=>setData('tipo_evento,e.target.value') }
                    className="mt-1 block w-3/4" options={['Ingreso','Salida']} ></Select>
                    <InputError message={errros.tipo_evento} classNamemt-2></InputError>
                  </div>
                  <div className="mt-6 ">
                    <SecondaryButton processing={processing} className='mt-2'>Guardar
                            <i className='fa-solid fa-save'></i>Guardar
                    </SecondaryButton>

                   </div>
                   <div className="mt-6 flex justify.end">
                    <SecondaryButton onClick={closeModal}>Cancelar

                    </SecondaryButton>

                   </div>

                  <div className='mt-6'>
                    <InputLabel for="dni" value="dni"></InputLabel>
                    <TextInput id="dni" name="dni" ref={dniInput}
                    value={data.dni} required='required' handlechange={(e)=>setData('dni,e.target.value') }
                    className="mt-1 block w-3/4"  isFocused></TextInput>
                    <InputError message={errros.dni} classNamemt-2></InputError>
                  </div>
                   
                   
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
            
        </AuthenticatedLayout>
    );
}
