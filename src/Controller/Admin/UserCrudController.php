<?php

namespace App\Controller\Admin;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class UserCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            EmailField::new('email'),
            ChoiceField::new('roles')
                ->setChoices([
                    'Employer' => 'ROLE_EMPLOYER',
                    'Candidate' => 'ROLE_CANDIDATE',
                ])
                ->allowMultipleChoices(),
            TextField::new('firstName', 'First Name'),
            TextField::new('lastName', 'Last Name'),
            ChoiceField::new('userType')
                ->setChoices([
                    'Employer' => 'employer',
                    'Candidate' => 'candidate',
                ]),
            TextField::new('password')
                ->setFormType(PasswordType::class)
                ->onlyOnForms(),
        ];
    }
}