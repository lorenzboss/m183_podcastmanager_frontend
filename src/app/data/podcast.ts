import { Artist } from './artist';
import { Topic } from './topic';

export class Podcast {
  id!: number;
  title!: string;
  description!: string;
  artists!: Artist[];
  topics!: Topic[];
}

export class CreatePodcast {
  title!: string;
  description!: string;
  artists!: CreatePodcastArtist[];
  topics!: CreatePodcastTopic[];
}

export class UpdatePodcast {
  id!: number;
  title!: string;
  description!: string;
  artists!: CreatePodcastArtist[];
  topics!: CreatePodcastTopic[];
}

export class CreatePodcastArtist {
  id!: number;
}

export class CreatePodcastTopic {
  id!: number;
}
