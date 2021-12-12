import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-freeze-dialog',
  templateUrl: './freeze-dialog.component.html',
  styleUrls: ['./freeze-dialog.component.scss'],
})
export class FreezeDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<FreezeDialogComponent>) {}

  ngOnInit(): void {
    setTimeout(() => {
      console.log('Closing!');
      this.dialogRef.close();
    }, 5000);
  }
}
