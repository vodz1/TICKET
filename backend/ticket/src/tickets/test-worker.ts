import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
@Processor('test')  
export class testWorker extends WorkerHost {
    async process(job: Job) {
        try {
            console.log('Job received:', job.id);
            await this.processJob(job);
            console.log({ status: 'completed', jobId: job.id, data: job.data });
        } catch (error) {
            console.error('Error processing job:', job.id, error);
            throw error;
        }
    }

    async processJob(job: Job) {
        console.log('Processing job:', job.data);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}