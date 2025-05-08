<?php

namespace App\Controller\Admin;

use App\Entity\Company;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\UrlField;

class CompanyCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Company::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('name', 'Company Name'),
            TextField::new('logo', 'Logo URL'),
            TextField::new('industry'),
            TextField::new('location'),
            TextField::new('employees', 'Number of Employees'),
            IntegerField::new('jobs', 'Open Jobs'),
            TextEditorField::new('description'),
            UrlField::new('website')->setRequired(false),
            TextField::new('founded')->setRequired(false),
            ArrayField::new('values', 'Company Values')->setRequired(false),
            ArrayField::new('benefits', 'Company Benefits')->setRequired(false),
        ];
    }
}