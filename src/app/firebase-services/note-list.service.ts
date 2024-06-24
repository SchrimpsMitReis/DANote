import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { Firestore, collectionData, collection, doc, onSnapshot, addDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = []

  unsubNotes;
  unsubTrash;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubNotes = this.subNotesList()
    this.unsubTrash = this.subTrashList()
  }

  async addNote(item: Note){
    await addDoc(this.getNotesRef(), item).catch( (e) =>{ console.error(e)})
    .then(
      (docRef) => {console.log("Document written with ID= ", docRef?.id);
      }
    )
  }

  async updateNote(id: string, docId: string, item: {}){
    await updateDoc(this.getSingleDocRef(id, docId), item).catch(
      (e)=>{console.error(e)});
    }



  ngOnDestroy(){
  this.unsubNotes()
  }
  subTrashList(){
    return onSnapshot(this.getTrashRef(), (list) => {
      this.trashNotes = []
      list.forEach(element => {
        this.trashNotes.push(this.setNodeObject(element))
      })
    })
  }
  subNotesList(){
    return onSnapshot(this.getNotesRef(), (list) => {
      this.normalNotes = []
      list.forEach(element => {
        this.normalNotes.push(this.setNodeObject(element))
      })
    })
  }
  // Methoden
  setNodeObject(obj: any){
    let data = obj.data()
    
    return {
      "id": obj.id,
      "type": obj.type || "node" ,
      "title": data.title || "",
      "content": data.content,
      "marked": obj.marked || false,
    }
  }

  getNotesRef() {
    return collection(this.firestore, 'notes');
  }
  getTrashRef() {
    return collection(this.firestore, 'trash');
  }
  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId)
  }
}
