import { ApiService } from './../services/api.service';
import { Component,Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { ignoreElements } from 'rxjs';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
freshnessList = ["Novo", "Segunda Mão","Usado"]
productForm !: FormGroup;
actionBtn : string = "Adicionar";
constructor(private FormBuilder : FormBuilder, 
  private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
   private dialogRef : MatDialogRef<DialogComponent>){}

ngOnInit(): void {
  this.productForm = this.FormBuilder.group({

    productName : ['',Validators.required],
    categoria : ['',Validators.required],
    freshness : ['',Validators.required],
    price : ['',Validators.required],
    comment:['',Validators.required],
    date: ['',Validators.required]
  });

if(this.editData){
  this.actionBtn = "Atualizar";
  this.productForm.controls['productName'].setValue(this.editData.productName);
  this.productForm.controls['categoria'].setValue(this.editData.categoria);
  this.productForm.controls['freshness'].setValue(this.editData.freshness);
  this.productForm.controls['price'].setValue(this.editData.price);
  this.productForm.controls['comment'].setValue(this.editData.comment);
  this.productForm.controls['date'].setValue(this.editData.date);
}

}

addProduct(){
 
  if(!this.editData){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert("Produto Adicionado com Sucesso");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("erro Durante a Adição do Produto")
        }
      })
    }
  }else{
     
    this.updateProduct()

  }

}

updateProduct(){

  this.api.putProduct(this.productForm.value,this.editData.id)
.subscribe({
next:(res)=>{

  alert("Produto Atualizado");
  this.productForm.reset();
  this.dialogRef.close('update');
},

error:()=>{

  alert("Falha na atualização");
}


})

}

}
