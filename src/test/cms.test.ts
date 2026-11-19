import { describe,it,expect } from 'vitest';
import { createSeed,blankEntry,saveRecord,publishedEntries,validateBackup,safeUrl } from '@/lib/cms/model';
describe('Local publication rules',()=>{
 it('keeps saved drafts separate from the published version',()=>{const state=createSeed();const record=state.records[0];if(!record)throw Error('Seed required');const changed={...record.draft,title:'Taslak kapı'};const result=saveRecord(state,changed,'draft','2026-11-18');expect(publishedEntries(result,'services')[0]?.title).toBe('Demir ve Bahçe Kapıları');expect(result.records[0]?.draft.title).toBe('Taslak kapı');});
 it('publishes a new service into the public collection',()=>{const state=createSeed();const entry={...blankEntry('services','new'),title:'Yeni Hizmet',slug:'yeni-hizmet',description:'Özel üretim'};expect(publishedEntries(saveRecord(state,entry,'draft','2026-11-18'),'services').some(e=>e.slug==='yeni-hizmet')).toBe(false);expect(publishedEntries(saveRecord(state,entry,'publish','2026-11-18'),'services').some(e=>e.slug==='yeni-hizmet')).toBe(true);});
 it('removes archived records from public content',()=>{const state=createSeed();const record=state.records[0];if(!record)throw Error('Seed required');expect(publishedEntries(saveRecord(state,record.draft,'archive','2026-11-18'),'services').some(e=>e.id===record.id)).toBe(false);});
 it('rejects duplicate slugs',()=>{const state=createSeed();const record=state.records[0];if(!record)throw Error('Seed required');expect(()=>saveRecord(state,{...record.draft,id:'other'},'draft','2026-11-18')).toThrow('slug');});
 it('rejects invalid backup schemas',()=>{expect(()=>validateBackup({version:1,records:[]})).toThrow();expect(validateBackup(createSeed()).records).toHaveLength(18);});
 it('does not render javascript links',()=>{expect(safeUrl('javascript:alert(1)')).toBe('');expect(safeUrl('//malicious.test')).toBe('');expect(safeUrl('/hizmetler')).toBe('/hizmetler');});
});
