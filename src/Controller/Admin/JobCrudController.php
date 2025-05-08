<?php

namespace App\Controller\Admin;

use App\Entity\Job;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\UrlField;

class JobCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Job::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('title', 'Job Title'),
            TextField::new('company', 'Company Name'),
            TextField::new('location', 'Location'),
            TextField::new('salary', 'Salary'),
            ChoiceField::new('type')
                ->setChoices([
                    'Full-Time' => 'full-time',
                    'Part-Time' => 'part-time',
                    'Freelance' => 'freelance',
                    'Internship' => 'internship',
                ]),
            DateField::new('posted', 'Date Posted')->setFormat('yyyy-MM-dd HH:mm:ss'),
            UrlField::new('logo', 'Company Logo')->setRequired(false),
            ArrayField::new('tags', 'Tags'),
            TextEditorField::new('description'),
            ArrayField::new('requirements', 'Requirements'),
            ArrayField::new('responsibilities', 'Responsibilities'),
            ArrayField::new('benefits', 'Benefits'),
        ];
    }
}