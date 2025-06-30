import { BaseRepository } from "@/modules/base.repository";
import { assessmentsRepository, AssessmentEntity } from "@/database";
import { Assessment } from "./assessment.dto";

export class AssessmentsRepository extends BaseRepository {
  public async findAll(filters: {
    withDeleted: boolean;
  }): Promise<AssessmentEntity[]> {
    const queryBuilder = assessmentsRepository.createQueryBuilder("assessment");

    if (filters.withDeleted) {
      queryBuilder.withDeleted();
    }

    return queryBuilder.getMany();
  }

  public async findByInstructorId(
    instructorId: number,
    filters: { withDeleted: boolean } = { withDeleted: false }
  ): Promise<AssessmentEntity[]> {
    const queryBuilder = assessmentsRepository
      .createQueryBuilder("assessment")
      .where("assessment.instructor_id = :instructorId", { instructorId });

    if (filters.withDeleted) {
      queryBuilder.withDeleted();
    }

    return queryBuilder.getMany();
  }

  public async findById(
    id: number,
    filters: { withDeleted: boolean } = { withDeleted: false }
  ): Promise<AssessmentEntity | null> {
    const queryBuilder = assessmentsRepository
      .createQueryBuilder("assessment")
      .where("assessment.id = :id", { id });

    if (filters.withDeleted) {
      queryBuilder.withDeleted();
    }

    return queryBuilder.getOne();
  }

  public async create(data: Assessment): Promise<AssessmentEntity> {
    const assessment = assessmentsRepository.create(data);
    return assessmentsRepository.save(assessment);
  }

  public async update(
    id: number,
    data: Partial<Assessment>
  ): Promise<AssessmentEntity | null> {
    const assessment = await this.findById(id);
    if (!assessment) return null;

    Object.assign(assessment, data);
    return assessmentsRepository.save(assessment);
  }

  public async delete(id: number): Promise<boolean> {
    const assessment = await this.findById(id);
    if (!assessment) return false;

    await assessmentsRepository.softDelete(id);
    return true;
  }
}
