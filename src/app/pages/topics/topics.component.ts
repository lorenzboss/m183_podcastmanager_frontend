import { Component } from '@angular/core';
import { TopicsService } from '../../service/topics.service';
import { MatDialog } from '@angular/material/dialog';
import { Topic } from '../../data/topic';
import { AddTopicDialogComponent } from '../../components/add-topic-dialog/add-topic-dialog.component';
import { EditTopicDialogComponent } from '../../components/edit-topic-dialog/edit-topic-dialog.component';
import { DeleteTopicDialogComponent } from '../../components/delete-topic-dialog/delete-topic-dialog.component';

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
    const dialogRef = this.dialog.open(AddTopicDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getTopics();
    });
  }

  openEditTopicDialog(topic: Topic) {
    const dialogRef = this.dialog.open(EditTopicDialogComponent, {
      data: topic,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getTopics();
    });
  }

  openDeleteTopicDialog(topic: Topic) {
    const dialogRef = this.dialog.open(DeleteTopicDialogComponent, {
      data: topic,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getTopics();
    });
  }
}
