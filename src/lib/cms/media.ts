import type { Media } from './model';
export const MAX_IMAGE_SIZE=8*1024*1024;
function db():Promise<IDBDatabase> { return new Promise((resolve,reject)=>{ const request=indexedDB.open('davutoglu-media',1); request.onupgradeneeded=()=>request.result.createObjectStore('images'); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(new Error('Görsel deposu açılamadı. Tarayıcı izinlerini kontrol edin.')); }); }
export async function uploadMedia(file:File):Promise<Media> {
 if(!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)) throw new Error('JPEG, PNG, WebP veya GIF görseli seçin.');
 if(file.size>MAX_IMAGE_SIZE) throw new Error('Görsel en fazla 8 MB olabilir.');
 const id=crypto.randomUUID(); const database=await db();
 await new Promise<void>((resolve,reject)=>{const tx=database.transaction('images','readwrite');tx.objectStore('images').put(file,id);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(new Error('Görsel kaydedilemedi. Tarayıcı depolaması dolu olabilir.'));});database.close();
 return {id,url:`media:${id}`,name:file.name,alt:'',kind:'Referans Görsel',size:file.size,local:true};
}
export async function readMedia(id:string):Promise<string> { const database=await db(); const file=await new Promise<Blob|undefined>((resolve,reject)=>{const req=database.transaction('images').objectStore('images').get(id);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});database.close();if(!file) return '';return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(typeof reader.result==='string'?reader.result:'');reader.onerror=()=>reject(reader.error);reader.readAsDataURL(file);}); }
export async function removeMedia(id:string) { const database=await db();await new Promise<void>((resolve,reject)=>{const tx=database.transaction('images','readwrite');tx.objectStore('images').delete(id);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});database.close(); }
