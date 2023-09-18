import { ApiService } from './services/api.service';
import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { EventEmitter,Output , OnInit,ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Projeto';
  displayedColumns: string[] = ['productName', 'categoria','date','freshness', 'price', 'comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 constructor(private dialog : MatDialog, private api : ApiService){



 }
ngOnInit() : void {
this.getAllProducts();

}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){

        this.getAllProducts();
      }

    })
  }

  getAllProducts(){
    this.api.getProduct()
    .subscribe({
       
      next:(res)=>{

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort

      },
      error:(err)=>{
        alert("Erro ao Recuperar os Registros!")
       
      }

    })
  }

  editProduct(row : any){

    this.dialog.open(DialogComponent,{
     width:'30%',
     data:row

    }).afterClosed().subscribe(val=>{

      if(val === 'update'){

        this.getAllProducts();
      }
    })


  }
  deleteProduct(id:number){
 this.api.deleteProduct(id)
 .subscribe({
next:(res)=>{
    
  alert("Produto Deletado com Sucesso")

},
error:()=>{
   
  alert("Erro Durante a Exclusão do Produto!")

}

 })

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
