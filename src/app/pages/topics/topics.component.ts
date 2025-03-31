import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  DeleteDialogComponent,
  DeleteDialogData,
} from '../../components/delete-dialog/delete-dialog.component';
import { TopicDialogComponent } from '../../components/topic-dialog/topic-dialog.component';
import { Topic } from '../../data/topic';
import { TopicsService } from '../../service/topics.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss',
})
export class TopicsComponent {
  constructor(private topicsService: TopicsService, public dialog: MatDialog) {
    this.getTopics();
  }
  topics: Topic[] = [];
  displayedColumns: string[] = ['description', 'actions'];

  public getTopics() {
    this.topicsService.getTopics().subscribe((topics: Topic[]) => {
      this.topics = topics;
    });
  }

  openAddTopicDialog() {
    const dialogRef = this.dialog.open(TopicDialogComponent, {
      data: null, // Pass null for add mode
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTopics();
      }
    });
  }

  openEditTopicDialog(topic: Topic) {
    const dialogRef = this.dialog.open(TopicDialogComponent, {
      data: topic, // Pass topic object for edit mode
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTopics();
      }
    });
  }

  openDeleteTopicDialog(topic: Topic) {
    const dialogData: DeleteDialogData<Topic> = {
      item: topic,
      itemType: 'Topic',
      deleteFunction: (item: Topic) => this.topicsService.deleteTopic(item),
    };

    const dialogRef = this.dialog.open(DeleteDialogComponent<Topic>, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTopics();
      }
    });
  }
}
