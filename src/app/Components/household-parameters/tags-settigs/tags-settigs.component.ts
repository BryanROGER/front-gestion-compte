import {Component, inject, OnInit} from '@angular/core';
import {TagService} from "../../../services/api-service/tag.service";
import {Tag} from "../../../../models/Tag";
import {User} from "../../../../models/user";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-tags-settigs',
  standalone: true,
  imports: [
    MatSlideToggle,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef
  ],
  templateUrl: './tags-settigs.component.html',
  styleUrl: './tags-settigs.component.scss'
})
export class TagsSettigsComponent implements OnInit {
  tagsService = inject(TagService)

  ngOnInit() {
    this.tagsService.getAllTags().subscribe({
        next: (response: any) => {
          response.data.forEach((tag: Tag) => {
            console.log(tag)
            this.tags.push(tag);
          });
          this.dataSource = this.tags;
        },
      }
    )
  }

  tags:Tag[]=[]
  dataSource:Tag[]=[]

  displayedColumns: string[] = ['Nom libellé', 'Dépense', 'Revenu'];

}
