package br.com.costs.Costs.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.costs.Costs.Model.Categoria;
import br.com.costs.Costs.Repository.CategoriaRepository;

@Service
public class CategoriaService {
	
	@Autowired
	private CategoriaRepository repository;
	
	public List<Categoria> ListarCategorias(){
		return (List<Categoria>) repository.findAll();
	}
}
