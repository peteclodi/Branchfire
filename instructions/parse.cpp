
#include <fstream>
#include <iostream>


void
parse(const char * path)
{
    std::ifstream in(path);
    while (in.good())
    {
        std::string type, email, first, last, person1, person2;
        in >> type;
        if (1 != type.length())
            continue;
        switch (type[0])
        {

        case 'P':
            in >> email;
            in >> first;
            in >> last;
            // TODO: add the indicated person
            std::cout << "Would add person: " << email << " (" << first << " " << last << ")" << std::endl;
            break;

        case 'p':
            in >> person1;
            in >> person2;
            // TODO: set person1 as the parent of person2
            std::cout << "Would set " << person1 << " as the parent of " << person2 << std::endl;
            break;

        case 'c':
            in >> person1;
            in >> person2;
            // TODO: set person1 as the child of person2
            std::cout << "Would set " << person1 << " as the child of " << person2 << std::endl;
            break;

        case 'f':
            in >> person1;
            in >> person2;
            // TODO: set person1 and person2 to be friends
            std::cout << "Would make " << person1 << " and " << person2 << " friends" << std::endl;
            break;

        default:
            std::cerr << "** Unexpeted input: " << type << std::endl;
            break;
        }
    }
}

int
main(int argc, char ** argv)
{
    if (argc != 2)
    {
        std::cerr << "Usage: " << argv[0] << " [inputFile]" << std::endl;
        return -1;
    }
    parse(argv[1]);
    std::cout << std::endl << "Parse complete." << std::endl;
}
