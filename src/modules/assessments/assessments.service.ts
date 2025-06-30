import { Assessment } from "./assessment.dto";
import { AssessmentsRepository } from "./assessments.repository";

export class AssessmentsService {
  private assessmentsRepository: AssessmentsRepository;

  constructor() {
    this.assessmentsRepository = new AssessmentsRepository();
  }

  public async createAssessment(data: Assessment): Promise<Assessment> {
    const assessment = await this.assessmentsRepository.create(data);
    return assessment;
  }

  public async getAllAssessments(filters: {
    withDeleted: boolean;
  }): Promise<Assessment[]> {
    const assessments = await this.assessmentsRepository.findAll(filters);
    return assessments;
  }

  public async getAssessmentsByInstructorId(
    instructorId: number,
    filters: { withDeleted: boolean } = { withDeleted: false }
  ): Promise<Assessment[]> {
    const assessments = await this.assessmentsRepository.findByInstructorId(
      instructorId,
      filters
    );
    return assessments;
  }

  public async getAssessmentById(id: number): Promise<Assessment | null> {
    const assessment = await this.assessmentsRepository.findById(id);
    return assessment;
  }

  public async updateAssessment(
    id: number,
    data: Partial<Assessment>
  ): Promise<Assessment | null> {
    const assessment = await this.assessmentsRepository.update(id, data);
    return assessment;
  }

  public async deleteAssessment(id: number): Promise<boolean> {
    return this.assessmentsRepository.delete(id);
  }
}
